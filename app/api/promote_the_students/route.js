import { NextResponse } from "next/server";
import {
  connectDatabase,
  selectTable,
  createTable,
  updateTable,
  insertTable,
  checkTableExistence,
} from "@/db/createtable";
export async function POST(request, response) {
  const body = await request.json();
  const { Session, Status } = body.dataFromCaller;
  let msg = "";
  let AllStudents = [];
  let UniqueInfo = [];
  let NewClass = ["JS1", "JS2", "JS3", "SS1", "SS2", "SS3"];

  if (Status === "Check") {
    var result = [];
    const connect = await connectDatabase();
    result = await checkTableExistence(connect, Session);

    msg = result.length > 0 ? true : false;
    let theData = "";
  } else {
    if (Status === "Promote") {
      const connect = await connectDatabase();
      let prevSession = (parseInt(Session) - 10001).toString();
      const select_sql = `SELECT  student_id, subject_name, class FROM ${prevSession}_subjects_registered WHERE class LIKE '%JS1%' OR class LIKE '%JS2%' OR class LIKE '%SS1%' OR class LIKE '%SS2%' `;

      var result = await selectTable(connect, select_sql);
      AllStudents = result;

      let create_sql =
        "ssn INT PRIMARY KEY AUTO_INCREMENT,student_id VARCHAR(30), subject_name VARCHAR(40), subject_type VARCHAR(30), class VARCHAR(10), teacher_id VARCHAR(20), date_registered VARCHAR(20), first_term_ca_score1 VARCHAR(10) DEFAULT 'AB', first_term_ca_score2 VARCHAR(10) DEFAULT 'AB', first_term_exam_score VARCHAR(10) DEFAULT 'AB', first_term_total_score INT(10), first_term_highest_score VARCHAR(10), first_term_lowest_score VARCHAR(10), first_term_average_score VARCHAR(10), first_term_position VARCHAR(10), first_term_grade VARCHAR(10), first_term_remark VARCHAR(10), second_term_ca_score1 VARCHAR(10) DEFAULT 'AB', second_term_ca_score2 VARCHAR(10) DEFAULT 'AB', second_term_exam_score VARCHAR(10) DEFAULT 'AB', second_term_total_score INT(10), second_term_highest_score VARCHAR(10), second_term_lowest_score VARCHAR(10), second_term_average_score VARCHAR(10), second_term_position VARCHAR(10), second_term_grade VARCHAR(10), second_term_remark VARCHAR(10), third_term_ca_score1 VARCHAR(10) DEFAULT 'AB', third_term_ca_score2 VARCHAR(10) DEFAULT 'AB', third_term_exam_score VARCHAR(10) DEFAULT 'AB', third_term_total_score INT(10), third_term_highest_score VARCHAR(10), third_term_lowest_score VARCHAR(10), third_term_average_score VARCHAR(10), third_term_position VARCHAR(10), third_term_grade VARCHAR(10), third_term_remark VARCHAR(10),  divisor INT(10) DEFAULT '3', overall_total_score INT(10), overall_highest_score VARCHAR(10), overall_lowest_score VARCHAR(10), overall_average_score VARCHAR(10), overall_position VARCHAR(10), overall_grade VARCHAR(10), overall_remark VARCHAR(10), general_average_score INT (10), promotion_status VARCHAR(30) DEFAULT 'Not decided', status VARCHAR(10) DEFAULT 'Active', UNIQUE (student_id, subject_name, class)";

      await createTable(connect, Session + "_subjects_registered", create_sql);

      create_sql = "ssn INT PRIMARY KEY AUTO_INCREMENT, attributes VARCHAR(50)";
      await createTable(connect, "all_psycomotor_attributes", create_sql);

      create_sql =
        "ssn INT PRIMARY KEY AUTO_INCREMENT, Session VARCHAR(10), Term VARCHAR(10), SchoolOpens VARCHAR(10), Resumption VARCHAR(10)";
      await createTable(connect, "Term_Properties", create_sql);

      create_sql =
        "ssn INT PRIMARY KEY AUTO_INCREMENT, student_id VARCHAR(30),  class VARCHAR(5), first_term_attribute VARCHAR(200), first_term_value VARCHAR(4), second_term_attribute VARCHAR(200), second_term_value VARCHAR(4), third_term_attribute VARCHAR(200), third_term_value VARCHAR(4)";

      await createTable(connect, Session + "_psycomotor_ratings", create_sql);

      create_sql =
        "ssn INT PRIMARY KEY AUTO_INCREMENT, student_id VARCHAR(30),  class VARCHAR(5), first_term_ctc VARCHAR(1000), first_term_pc VARCHAR(1000), first_term_attendance  VARCHAR(5), second_term_ctc VARCHAR(1000), second_term_pc VARCHAR(1000), second_term_attendance  VARCHAR(5), third_term_ctc VARCHAR(1000), third_term_pc VARCHAR(1000), third_term_attendance  VARCHAR(5),   UNIQUE (student_id, class)";

      await createTable(
        connect,
        Session + "_all_comments_and_attendance",
        create_sql
      );

      create_sql =
        "ssn INT PRIMARY KEY AUTO_INCREMENT, student_id VARCHAR(30),  session VARCHAR(20), term VARCHAR(10), class VARCHAR(20), gate VARCHAR(200), status VARCHAR(20)";
      await createTable(connect, `${Session}_resultchecker`, create_sql);

      let TheValues = [];
      AllStudents.forEach((element) => {
        let OClaz = element.class;
        let C1 = OClaz.substring(0, 3);
        let Arm = OClaz.substring(OClaz.length - 1);
        let OldInd = NewClass.indexOf(C1);
        let Claz = NewClass[OldInd + 1] + Arm;

        let TheVal = [element.student_id, element.subject_name, Claz];
        TheValues = [...TheValues, TheVal];

        let newElement = {
          student_id: element.student_id,
          class: element.class,
        };
        if (
          !UniqueInfo.some(
            (obj) => JSON.stringify(obj) === JSON.stringify(newElement)
          )
        ) {
          UniqueInfo.push(newElement);
        }
      });

      let sql = `INSERT into ${Session}_subjects_registered (student_id, subject_name, class) VALUES ?`;
      const params = TheValues;

      result = await insertTable(connect, sql, params);

      for (var m = 0; m < UniqueInfo.length; m++) {
        let element = UniqueInfo[m];
        // UniqueInfo.forEach(element => {
        let SID = element.student_id;
        let OClaz = element.class;
        let C1 = OClaz.substring(0, 3);
        let Arm = OClaz.substring(OClaz.length - 1);
        let OldInd = NewClass.indexOf(C1);
        let Claz = NewClass[OldInd + 1] + Arm;

        const CreatePsychomotor = async () => {
          let select_sql = "SELECT attributes FROM all_psycomotor_attributes";
          result = await selectTable(connect, select_sql);
          let response = result;

          if (result.length < 1) {
            let params = [
              ["Attentiveness in Class"],
              ["Reliability"],
              ["Fluency"],
              ["Drawing, Painting & Craft"],
              ["Games, Sports & Gymnastics"],
              ["Handling of Tools in the Lab/Shop"],
              ["Handwriting"],
              ["Honesty"],
              ["Initiative"],
              ["Musical Skills"],
              ["Neatness"],
              ["Obedience"],
              ["Organisation Ability"],
              [" Perseverance/ Industry"],
              ["Politeness"],
              ["Promptness in Completing work"],
              ["Punctuality, Attendance in Class"],
              ["Relationship with other Students"],
              ["Self Control"],
              ["Self of Responsibility"],
              ["Spirit of Cooperation"],
              ["Trustworthiness"],
            ];

            const sql = `INSERT into all_psycomotor_attributes (attributes) VALUES ?`;
            result = await insertTable(connect, sql, params);
            CreatePsychomotor();
          } else {
            let select_sql = `SELECT student_id FROM ${Session}_psycomotor_ratings WHERE student_id = '${SID}' `;
            result = await selectTable(connect, select_sql);

            if (result.length < 1) {
              let TheValuz = [];
              response.forEach((att) => {
                let TheVal = [
                  SID,
                  Claz,
                  `${att.attributes}`,
                  `${att.attributes}`,
                  `${att.attributes}`,
                ];
                TheValuz = [...TheValuz, TheVal];
              });

              const sql = `INSERT into ${Session}_psycomotor_ratings (student_id, class, first_term_attribute, second_term_attribute, third_term_attribute) VALUES ?`;

              result = await insertTable(connect, sql, TheValuz);
            }
          }
        };

        CreatePsychomotor();

        let select_sql = `SELECT student_id FROM ${Session}_all_comments_and_attendance WHERE student_id = '${SID}' `;
        result = await selectTable(connect, select_sql);

        if (result.length < 1) {
          let Prmz = [[SID, Claz]];
          const sql2 = `INSERT into ${Session}_all_comments_and_attendance (student_id, class) VALUES ?`;

          result = await insertTable(connect, sql2, Prmz);
        }

        let TheTerms = ["First", "Second", "Third"];

        var CryptoJS = require("crypto-js");
        for (var i = 0; i < TheTerms.length; i++) {
          let aPIN =
            Date.now().toString().slice(-4) +
            Math.floor(1000 + Math.random() * 9000).toString() +
            Math.floor(1000 + Math.random() * 9000).toString() +
            Math.floor(1000 + Math.random() * 9000).toString();

          let PIN = process.env.mypin;
          aPIN = aPIN.toString();
          aPIN = CryptoJS.AES.encrypt(aPIN, PIN).toString();
          let theval = [[SID, Session, TheTerms[i], Claz, aPIN]];

          let sql = `INSERT into ${Session}_resultchecker (student_id, session, term, class, gate) VALUES ?`;
          const params = theval;

          result = await insertTable(connect, sql, params);
        }

        select_sql = `SELECT class FROM students_class_track WHERE student_id = '${SID}' AND session =  '${Session}'`;
        result = await selectTable(connect, select_sql);

        if (result.length < 1) {
          let Track = [[SID, Session, Claz]];
          const sql3 = `INSERT into students_class_track (student_id, session, class) VALUES ?`;
          result = await insertTable(connect, sql3, Track);
        }
      }

      msg = "success";
    }
  }

  return NextResponse.json({ message: msg, success: true });
}
