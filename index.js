const express = require('express');
const b_parser = require('body-parser');
const app = express();

const port = 3000;
app.listen(port, () => {
    console.log("server Start");
});

app.set("view engine", "ejs");
app.use(b_parser.urlencoded({ extended: false }));
app.use(b_parser.json());

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/view', (req, res) => {
    res.render('view', { students });
  });

let students = [];

app.post('/S_Form', (req, res) => {
    let my_s = {
        s_name: req.body.s_name,
        s_contact: req.body.s_contact,
        id: students.length + 1
    };
  
    students.push(my_s);
    res.redirect("/view");
});

app.get("/delete/:id", (req, res) => {
    const id = req.params.id;
    students = students.filter(student => student.id != id);
    res.redirect("/view");
  });

  app.get("/edit/:id", (req, res) => {
    const id = req.params.id;
    const student = students.find(student => student.id == id);
    res.render("edit", { student });
  });

  app.post("/update/:id", (req, res) => {
    const id = req.params.id;
    const update_s = {
      id: parseInt(id),
      s_name: req.body.s_name,
      s_contact: req.body.s_contact,
    };
  
    students = students.map(student => {
      if (student.id == id) {
        return update_s;
      } else {
        return student;
      }
    });
    
    res.redirect("/view");
  });