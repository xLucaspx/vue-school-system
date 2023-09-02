<template>
  <v-app>
    <NavDrawer></NavDrawer>
    <AppBar>
      <template v-slot:title>Student information</template>
    </AppBar>

    <v-main>
      <v-card>
        <v-card-title class="card-title">
          <RouterLink to="/" class="link">
            <v-btn
              color="indigo darken-4"
              variant="outlined"
              prepend-icon="mdi-arrow-left"
              title="Home"
              >Go back</v-btn
            >
          </RouterLink>

          <v-text-field
            variant="underlined"
            prepend-icon="mdi-magnify"
            label="Search by student's name..."
            single-line
            hide-details
            v-model="query"
          ></v-text-field>

          <RouterLink to="/students/register" class="link">
            <v-btn
              color="success"
              variant="flat"
              prepend-icon="mdi-account-plus-outline"
              title="Register a new student"
              >Register student</v-btn
            >
          </RouterLink>
        </v-card-title>

        <v-table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>CPF</th>
              <th>E-mail</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="student in students" :key="student.id">
              <td>{{ student.id }}</td>
              <td>{{ student.name }}</td>
              <td>{{ student.cpf }}</td>
              <td>{{ student.email }}</td>
              <td class="text-center">
                <!-- Edit button -->
                <RouterLink
                  :to="`/students/${student.id}`"
                  class="link"
                  :title="'Edit ' + student.name"
                >
                  <v-btn
                    variant="outlined"
                    prepend-icon="mdi-pencil-outline"
                    size="small"
                    class="table__button"
                    >Edit
                  </v-btn>
                </RouterLink>

                <!-- Delete dialog button -->
                <v-btn
                  color="error"
                  variant="flat"
                  prepend-icon="mdi-delete-forever-outline"
                  size="small"
                  class="table__button"
                  :title="'Delete ' + student.name"
                  @click="selectStudent(student)"
                  >Delete

                  <!-- Delete dialog -->
                  <v-dialog
                    v-model="dialog"
                    activator="parent"
                    transition="dialog-top-transition"
                  >
                    <v-card class="delete-dialog">
                      <v-card-text
                        >Do you wish do permanently delete the student
                        {{ selectedStudent.name }} under the ID
                        {{ selectedStudent.id }}?
                      </v-card-text>
                      <v-card-actions class="delete-dialog__buttons">
                        <!-- Delete button -->
                        <v-btn
                          color="error"
                          variant="flat"
                          prepend-icon="mdi-delete-forever-outline"
                          @click="deleteStudent(selectedStudent.id)"
                          >Delete</v-btn
                        >

                        <v-btn
                          color="indigo darken-4"
                          variant="outlined"
                          prepend-icon="mdi-cancel"
                          @click="dialog = false"
                          >Cancel</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent, watchEffect, computed } from "vue";
import AppBar from "@/components/AppBar";
import NavDrawer from "@/components/NavDrawer";
import { useStudentStore } from "@/stores/students";
import { ref } from "@vue/reactivity";
import { useAlertStore } from "@/stores/alerts";

export default defineComponent({
  name: "StudentsTable",
  components: {
    AppBar,
    NavDrawer,
  },
  data() {
    return {
      dialog: false,
      selectedStudent: null,
    };
  },
  methods: {
    selectStudent(student) {
      this.selectedStudent = student;
    },

    async deleteStudent(id) {
      await this.studentStore.deleteStudent(id);
      this.dialog = false;
      this.alertStore.alert({
        type: "success",
        text: "The student was successfully deleted!",
      });
      console.log(this.studentStore.students);
    },
  },
  async setup() {
    const studentStore = useStudentStore();
    const alertStore = useAlertStore();

    const students = computed(() => studentStore.students);

    const query = ref("");
    watchEffect(async () => await studentStore.getStudents(query.value));

    return {
      studentStore,
      alertStore,
      query,
      students,
    };
  },
});
</script>

<style scoped>
.card-title {
  display: flex;
  gap: 1rem;
  align-items: flex-end;
}

.table__button {
  margin: 0 10px;
}

.delete-dialog {
  max-width: 750px;
  margin: 0 auto;
  text-align: center;
}

.delete-dialog__buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
</style>
