<template>
  <router-view></router-view>
</template>

<script>
import {
  getJwtTokenLocal,
  setAuthHeader,
  clearAuthorization,
} from "./utils/auth";
import { isEmpty } from "./utils/validations";
import { interceptResponse } from "./utils/auth";

export default {
  methods: {},
  beforeCreate() {
    this.$material.locale.dateFormat = "dd/MM/yyyy";
    //initialize response intercepter if status code == 401 or 403
    interceptResponse(() => {
      clearAuthorization();
      this.$store.dispatch("auth/setIsAuthorized", false);
      this.$router.push("/login");
    });

    // check user is logged in or not
    const jwtToken = getJwtTokenLocal();
    if (isEmpty(jwtToken)) {
      setAuthHeader(null);
      this.$store.dispatch("auth/setIsAuthorized", false);
      this.$router.push("/login");
    } else {
      setAuthHeader(jwtToken);
      this.$store.dispatch("auth/setIsAuthorized", true);

      // navigate to information page if current page is login page
      if (this.$route.path == "/login") {
        this.$router.push("/information");
      }
    }
  },
};
</script>

<style>
.my-page-header {
  text-align: center !important;
  margin-top: 0;
  padding: 0;
}

div.md-table-head-label,
.md-table-head-container {
  text-align: center;
  padding-left: 0;
  padding-right: 0;
  font-weight: 600;
  font-size: 1.1em;
}

.md-table-cell {
  padding-top: 0px;
  padding-bottom: 0px;
  text-align: center;
  font-size: 4em;
}

.main-panel > div:nth-child(2) {
  min-height: 100vh;
}

.md-table-row > .md-table-cell:last-child div.md-table-cell-container {
  padding: 0 !important;
  display: inline-block;
  margin: 0;
}

.md-table-cell-container,
.md-table-cell-container * {
  font-size: 1em;
}

.md-card-header {
  padding-left: 10px !important;
  padding-right: 10px !important;
}

div.content {
  padding-left: 30px !important;
  padding-right: 30px !important;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
  border-radius: 10px;
}

@media (max-width: 700px) {
  div.md-table-head-label,
  .md-table-head-container {
    font-size: 1em;
  }
  .md-table-cell-container {
    font-size: 0.8em;
    text-align: center;
    margin: 0;
  }
  td.md-table-cell {
    padding: 5px;
  }
  .md-table-cell-container img.im {
    width: 40px;
  }
  div.content {
    padding-left: 3px !important;
    padding-right: 3px !important;
  }
  div.md-card-content {
    padding-left: 10px !important;
    padding-right: 10px !important;
  }
}

.text-center {
  text-align: center;
}

.width-cover {
  width: 100% !important;
}
.mw-100 {
  min-width: 100px;
}
.mw-150 {
  min-width: 150px;
}
.float-right {
  float: right;
}
.sm-btn {
  padding: 0px !important;
  font-size: 12px !important;
}
.sm-btn > div {
  padding: 5px !important;
}
</style>