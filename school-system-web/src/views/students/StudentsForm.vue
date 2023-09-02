<template>
  <v-app>
    <NavDrawer></NavDrawer>
    <AppBar>
      <template v-slot:title>{{ title }}</template>
    </AppBar>

    <v-main>
      <form @submit.prevent="saveStudent">
        <v-container class="form__inputs">
          <v-text-field
            :rules="[
              (v) => {
                if (inputIsEmpty(v)) {
                  return 'The student\'s name must be informed!';
                }
                return true;
              },
            ]"
            label="Name"
            v-model="name"
            placeholder="Student's name"
            variant="outlined"
            clearable
            required
          >
          </v-text-field>

          <v-text-field
            :rules="[
              (v) => {
                if (validateCpf(v)) {
                  return true;
                }
                return 'Invalid value for CPF!';
              },
            ]"
            label="CPF"
            v-model="cpf"
            type="number"
            placeholder="Student's CPF (only numbers)"
            variant="outlined"
            hint="Only numbers"
            :readonly="readonly"
            :clearable="!readonly"
            required
          >
          </v-text-field>

          <v-text-field
            :rules="[
              (v) => {
                if (validateEmail(v)) {
                  return true;
                }
                return 'Invalid e-mail address';
              },
            ]"
            label="E-mail"
            v-model="email"
            placeholder="Student's e-mail"
            variant="outlined"
            clearable
            required
          >
          </v-text-field>

          <v-text-field
            label="ID (automatically generated)"
            v-model="id"
            placeholder="the ID is automatically generated!"
            readonly
            variant="outlined"
          ></v-text-field>
        </v-container>

        <v-container class="form__buttons">
          <v-btn
            variant="flat"
            color="success"
            size="large"
            prepend-icon="mdi-content-save-outline"
            type="submit"
          >
            Register</v-btn
          >

          <v-btn
            variant="outlined"
            color="error"
            size="large"
            prepend-icon="mdi-cancel"
            @click="cancel"
          >
            Cancel</v-btn
          >
        </v-container>
      </form>
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent, ref } from "vue";
import AppBar from "@/components/AppBar";
import NavDrawer from "@/components/NavDrawer";
import { useRouter } from "vue-router";
import { useStudentStore } from "@/stores/students";
import { useAlertStore } from "@/stores/alerts";

export default defineComponent({
  name: "StudentsForm",
  components: {
    AppBar,
    NavDrawer,
  },
  props: {
    id: {
      type: String,
    },
  },
  setup(props) {
    const studentStore = useStudentStore();
    const alertStore = useAlertStore();
    const router = useRouter();

    const name = ref("");
    const cpf = ref("");
    const email = ref("");
    const id = ref("");

    let readonly = false;
    let title = "Student registration";

    if (props.id != "register") {
      readonly = true;
      title = "Student edit";

      const student = studentStore.students.find((s) => s.id == props.id);
      name.value = student?.name || "";
      cpf.value = student?.cpf || "";
      email.value = student?.email || "";
      id.value = student?.id || "";
    }

    function clearFields() {
      name.value = "";
      cpf.value = "";
      email.value = "";
      id.value = "";
    }

    function saveButtonSuccess(text) {
      clearFields();
      alertStore.alert({ type: "success", text });
      router.push("/students");
    }

    const inputIsEmpty = (input) => {
      return String(input).length == 0;
    };

    const validateCpf = (input) => {
      const cpf = String(input);
      let sum;
      let rest;
      sum = 0;

      if (cpf == "00000000000") return false;

      for (let i = 1; i <= 9; i++) {
        sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        rest = (sum * 10) % 11;
      }

      if (rest == 10 || rest == 11) rest = 0;

      if (rest != parseInt(cpf.substring(9, 10))) return false;

      sum = 0;

      for (let i = 1; i <= 10; i++) {
        sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        rest = (sum * 10) % 11;
      }

      if (rest == 10 || rest == 11) rest = 0;

      if (rest != parseInt(cpf.substring(10, 11))) return false;

      return true;
    };

    const validateEmail = (input) => {
      const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
      const email = String(input);

      return email.match(regex);
    };

    const saveStudent = async () => {
      if (
        inputIsEmpty(name.value) ||
        !validateCpf(cpf.value) ||
        !validateEmail(email.value)
      ) {
        alertStore.alert({
          type: "warning",
          text: "Os campos não estão preenchidos corretamente!",
        });
        return;
      }

      const student = {
        name: name.value,
        cpf: cpf.value,
        email: email.value,
      };

      if (props.id == "register") {
        await studentStore.createStudent(student);
        saveButtonSuccess("The student was successfully registered!");
      } else {
        // Update student
        await studentStore.updateStudent(props.id, student);
        saveButtonSuccess("The student was successfully edited!");
      }
    };

    const cancel = () => {
      clearFields();
      router.push("/students");
    };

    return {
      name,
      cpf,
      email,
      id,
      readonly,
      title,
      inputIsEmpty,
      validateCpf,
      validateEmail,
      saveStudent,
      cancel,
    };
  },
});
</script>

<style scoped>
.form__inputs {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form__buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}
</style>
