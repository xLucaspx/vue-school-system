import Home from "@/views/Home";
import Students from "@/views/Students";
import StudentsTable from "@/views/students/StudentsTable";
import StudentsForm from "@/views/students/StudentsForm";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "",
        name: "Home",
        component: Home,
      },
    ],
  },
  {
    path: "/students",
    component: Students,
    children: [
      {
        path: "",
        name: "Table",
        component: StudentsTable,
      },
      {
        path: "/register",
        name: "Register student",
        component: StudentsForm,
      },
      {
        path: ":id",
        name: "Edit student",
        component: StudentsForm,
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
