import { NextResponse } from "next/server";
import { connectDatabase, selectTable, updateTable } from "@/db/createtable";
export async function POST(request, response) {
  const body = await request.json();
  const { Session, Term, Claz, Subject, Results } = body.dataFromCaller;
  let result = 1;
  const connect = await connectDatabase();

  if (Results.length > 0) {
    Results.forEach(async (res) => {
      let totalScore = res.TotalScore;
      let grade = res.Grade;
      let remark = res.Remark;
      let position = "";
      if (res.EXAMScore < 1 || "ABab".includes(res.EXAMScore)) {
        totalScore = 0;
        grade = "";
        remark = "";
        position = "";
      }
      let update_params = [
        res.CA1Score.toUpperCase(),
        res.CA2Score.toUpperCase(),
        res.EXAMScore.toUpperCase(),
        totalScore,
        grade,
        position,
        remark,
        res.Divisor,
        res.StdNum,
        Subject,
        Claz,
      ];
      const update_sql = `Update ${Session}_subjects_registered SET ${Term}_term_ca_score1 = ?, ${Term}_term_ca_score2 = ?, ${Term}_term_exam_score = ?, ${Term}_term_total_score = ?, ${Term}_term_grade = ?, ${Term}_term_position = ?, ${Term}_term_remark = ?, divisor = ? WHERE student_id = ? AND subject_name = ? AND class = ?`;

      const update_result = await updateTable(
        connect,
        update_sql,
        update_params
      );
      result = update_result === 1 ? 1 : 0;
    });

    let claz = Claz.slice(0, 3);

    const select_sql = `SELECT student_id, ${Term}_term_total_score FROM ${Session}_subjects_registered WHERE ${Term}_term_total_score > 0 AND  class LIKE '%${claz}%' AND subject_name = '${Subject}' ORDER BY ${Term}_term_total_score DESC`;

    let AllTotalScores = await selectTable(connect, select_sql);

    const getminimum = (tot, considerator) => {
      let min = 0;
      for (var i = tot.length - 1; i >= 0; i--) {
        if (parseFloat(tot[i][considerator]) > 0) {
          min = tot[i][considerator];
          break;
        }
      }
      return min;
    };

    const getaverage = (tot, considerator) => {
      let sumtot = 0;
      let n = 0;
      let av = 0;
      tot.forEach((element) => {
        if (!isNaN(element[considerator]) && element[considerator] > 0) {
          n++;
          sumtot += parseFloat(element[considerator]);
        }
      });
      if (n > 0) {
        av = Math.ceil(sumtot / n);
      }
      return av;
    };

    const max_score = AllTotalScores[0][`${Term}_term_total_score`];
    const min_score = getminimum(AllTotalScores, `${Term}_term_total_score`);
    const average_score = getaverage(
      AllTotalScores,
      `${Term}_term_total_score`
    );

    const getPosMinMax = (ATS, max, min, ave, considerator) => {
      const nth = (n) => {
        return ["st", "nd", "rd"][((((n + 90) % 100) - 10) % 10) - 1] || "th";
      };
      let pos = 1;
      let prev = 0;
      let increament = 0;
      ATS = ATS.map((element) => {
        let ele = {};

        if (parseFloat(element[considerator]) === parseFloat(prev)) {
          ele = {
            ...element,
            position: pos + nth(pos),
            max_score: max,
            min_score: min,
            ave_score: ave,
          };
          increament++;
        } else {
          pos += increament;
          ele = {
            ...element,
            position: pos + nth(pos),
            max_score: max,
            min_score: min,
            ave_score: ave,
          };

          increament = 1;
        }
        prev = element[considerator];
        return ele;
      });
      return ATS;
    };

    AllTotalScores = getPosMinMax(
      AllTotalScores,
      max_score,
      min_score,
      average_score,
      `${Term}_term_total_score`
    );

    AllTotalScores.forEach(async (res) => {
      let update_params = [
        res.max_score,
        res.min_score,
        res.ave_score,
        res.position,
        res.student_id,
        Subject,
      ];
      const update_sql = `Update ${Session}_subjects_registered SET ${Term}_term_highest_score = ?, ${Term}_term_lowest_score = ?, ${Term}_term_average_score = ?, ${Term}_term_position = ? WHERE student_id = ? AND subject_name = ? AND class LIKE '%${claz}%'`;

      const update_result = await updateTable(
        connect,
        update_sql,
        update_params
      );
      result = update_result === 1 ? 1 : 0;
    });

    if (Term === "Third") {
      const GetJuniorGrade = (sc) => {
        let grd = "";
        let rmk = "";
        sc = parseFloat(sc);
        if (sc >= 0 && sc < 40) {
          grd = "F";
          rmk = "WEAK";
        }
        if (sc >= 40 && sc < 45) {
          grd = "E";
          rmk = "PASS";
        }

        if (sc >= 45 && sc < 50) {
          grd = "D";
          rmk = "PASS";
        }

        if (sc >= 50 && sc < 60) {
          grd = "C";
          rmk = "CREDIT";
        }

        if (sc >= 60 && sc < 70) {
          grd = "B";
          rmk = "GOOD";
        }
        if (sc >= 70 && sc <= 100) {
          grd = "A";
          rmk = "EXCELLENT";
        }

        let grdrmk = { grade: grd, remark: rmk };
        return grdrmk;
      };

      const GetSeniorGrade = (sc) => {
        let grd = "";
        let rmk = "";
        sc = parseFloat(sc);
        if (sc >= 0 && sc < 40) {
          grd = "F9";
          rmk = "WEAK";
        }
        if (sc >= 40 && sc < 45) {
          grd = "E8";
          rmk = "PASS";
        }

        if (sc >= 45 && sc < 50) {
          grd = "D7";
          rmk = "PASS";
        }

        if (sc >= 50 && sc < 55) {
          grd = "C6";
          rmk = "CREDIT";
        }
        if (sc >= 55 && sc < 60) {
          grd = "C5";
          rmk = "CREDIT";
        }

        if (sc >= 60 && sc < 65) {
          grd = "C4";
          rmk = "CREDIT";
        }

        if (sc >= 65 && sc < 70) {
          grd = "B3";
          rmk = "GOOD";
        }

        if (sc >= 70 && sc < 75) {
          grd = "B2";
          rmk = "VERY GOOD";
        }

        if (sc >= 70 && sc <= 100) {
          grd = "A1";
          rmk = "DISTINCTION";
        }

        let grdrmk = { grade: grd, remark: rmk };
        return grdrmk;
      };
      const getoveralltotalandaverage = (overall) => {
        overall = overall.map((ovr) => {
          let el = {};
          let ov1 =
            ovr.first_term_total_score === null ||
            ovr.first_term_total_score === ""
              ? 0
              : ovr.first_term_total_score;
          let ov2 =
            ovr.second_term_total_score === null ||
            ovr.second_term_total_score === ""
              ? 0
              : ovr.second_term_total_score;
          let ov3 =
            ovr.third_term_total_score === null ||
            ovr.third_term_total_score === ""
              ? 0
              : ovr.third_term_total_score;
          let ovsum = ov1 + ov2 + ov3;
          let ovave = Math.ceil(ovsum / ovr.divisor);
          let grdrmk = Claz.includes("JS")
            ? GetJuniorGrade(ovave)
            : GetSeniorGrade(ovave);
          el = {
            ...ovr,
            overall_total: ovsum,
            overall_average: ovave,
            overall_grade: grdrmk.grade,
            overall_remark: grdrmk.remark,
          };
          return el;
        });
        return overall;
      };

      const select_sql = `SELECT student_id, first_term_total_score, second_term_total_score, third_term_total_score, divisor FROM ${Session}_subjects_registered WHERE class  = '${Claz}' AND subject_name = '${Subject}'`;

      let CumTotalScores = await selectTable(connect, select_sql);

      let OverAllDetails = getoveralltotalandaverage(CumTotalScores);

      OverAllDetails.forEach(async (ovr) => {
        let update_params = [
          ovr.overall_total,
          ovr.overall_average,
          ovr.overall_grade,
          ovr.overall_remark,
          ovr.student_id,
          Subject,
          Claz,
        ];
        const update_sql = `Update ${Session}_subjects_registered SET overall_total_score = ?, overall_average_score = ?, overall_grade = ?, overall_remark = ? WHERE student_id = ? AND subject_name = ? AND class = ?`;

        const update_result = await updateTable(
          connect,
          update_sql,
          update_params
        );
        result = update_result === 1 ? 1 : 0;
      });

      const select_sql2 = `SELECT student_id, overall_total_score, overall_average_score FROM ${Session}_subjects_registered WHERE  overall_total_score > 0 AND  class LIKE '%${claz}%' AND subject_name = '${Subject}' ORDER BY overall_average_score DESC`;
      let AllOverallTotalScores = await selectTable(connect, select_sql2);

      const o_max_score = AllOverallTotalScores[0].overall_average_score;
      const o_min_score = getminimum(
        AllOverallTotalScores,
        "overall_average_score"
      );
      const gen_ave_score = getaverage(
        AllOverallTotalScores,
        "overall_average_score"
      );
      AllOverallTotalScores = getPosMinMax(
        AllOverallTotalScores,
        o_max_score,
        o_min_score,
        gen_ave_score,
        "overall_average_score"
      );

      AllOverallTotalScores.forEach(async (res) => {
        let update_params = [
          res.max_score,
          res.min_score,
          res.ave_score,
          res.position,
          res.student_id,
          Subject,
        ];
        const update_sql = `Update ${Session}_subjects_registered SET overall_highest_score = ?, overall_lowest_score = ?, general_average_score = ?, overall_position = ? WHERE student_id = ? AND subject_name = ? AND class LIKE '%${claz}%'`;

        const update_result = await updateTable(
          connect,
          update_sql,
          update_params
        );
        result = update_result === 1 ? 1 : 0;
      });
    }
  }

  //   connect.end();

  return result > 0
    ? NextResponse.json({ message: "Saved Successfully", success: true })
    : NextResponse.json({ message: "Failed woefully", success: true });
}
