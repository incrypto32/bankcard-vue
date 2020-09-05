<template>
  <div id="login">
    <section class="main-box">
      <div class="login-box">
        <h1>Sign In</h1>
        <form id="login-form" @submit.prevent="pressed">
          <input type="text" v-model="email" placeholder="Email" name="email" />
          <input
            type="password"
            v-model="password"
            placeholder="Password"
            name="password"
          />
          <div class="submit">
            <button type="submit">
              <div v-if="isLoading" class="loader"></div>
              <span v-else>Log In</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>
<script>
import * as firebase from "firebase/app";
import "firebase/auth";
const auth = firebase.auth();
export default {
  //  beforeCreate ()  {
  // console.log(auth.currentUser);
  // auth.onAuthStateChanged((user)=>{
  //   if(user){
  //     this.$router.replace({name:'home'})
  //   }
  // })
  // },
  methods: {
    async pressed() {
      this.isLoading = true;
      try {
        var user = await auth
          .signInWithEmailAndPassword(this.email, this.password)
          .catch((e) => {
            console.log(e);
          });
        console.log("___tesing auth___");

        if (user) {
          console.log(user);
          this.$router.replace({ name: "home" });
        }
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    },
  },
  data() {
    return {
      email: "",
      password: "",
      isLoading: false,
    };
  },
};
</script>

<style lang="scss" scoped>
// Main login box
.login-box {
  width: 80%;
}
#login {
  height: inherit;
  background: rgb(92, 113, 208);
  background: radial-gradient(
    circle,
    rgba(92, 113, 208, 1) 5%,
    rgba(59, 142, 231, 1) 49%,
    rgba(0, 198, 245, 1) 100%
  );
  display: flex;
  justify-content: center;
  .main-box {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    // The login box
    .login-box {
      border-radius: 1rem;
      padding: 2rem 1rem;
      background-color: rgb(255, 255, 255);
      display: flex;
      flex-direction: column;
      align-items: center;

      h1 {
        text-align: center;
      }

      form {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        input,
        btn {
          display: block;
        }

        input {
          width: 90%;
          min-height: 40px;
          font-size: 15px;
          padding-left: 10px;
          margin: 1rem 2rem;
        }

        .submit {
          display: flex;
          justify-content: center;

          button {
            border: 2px black solid;
            min-width: 130px;
            font-weight: bold;
            border-radius: 1rem;
            color: black;
            padding: 10px 40px;
            margin: 10px;
            display: flex;
            justify-content: center;

            &:hover {
              background: rgb(77, 77, 223);
              color: white;
            }
            .loader {
              border: 3px solid #f3f3f3; /* Light grey */
              border-top: 3px solid #3498db;
              border-right: 3px solid #3498db;
              border-bottom: 3px solid #3498db;
              border-radius: 50%;
              width: 20px;
              height: 20px;
              animation: spin 1s linear infinite;
            }

            @keyframes spin {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          }
        }
      }
    }
  }
}
@media only screen and (min-width: 800px) {
  .login-box {
    width: 500px;
  }
}
</style>
