<template>
  <div class="home">
    <StarBackground></StarBackground>
    <Hero></Hero>
    <!-- <NavLinks></NavLinks> -->
    <transition name="slide">
      <ContactMePromptPopup
        v-if="showPopup"
        @close="closePopup"
      ></ContactMePromptPopup>
    </transition>
  </div>
</template>
<script>
import Hero from "../components/Home/HeroComponent.vue";
import ContactMePromptPopup from "../components/reusables/ContactMePromptPopup.vue";
import StarBackground from "../components/reusables/StarBackground.vue";
// import NavLinks from "../components/Home/NavLinks.vue";
import { mapGetters } from "vuex";
export default {
  name: "HomeView",
  components: {
    Hero,
    ContactMePromptPopup,
    StarBackground,
    // NavLinks,
  },
  mounted() {
    let hasSeenPopup = JSON.parse(window.localStorage.getItem("hasSeenPopup"));
    setTimeout(() => {
      if (!hasSeenPopup) {
        this.showPopup = true;
      }
    }, 3000);
  },
  data() {
    return {
      showPopup: false,
    };
  },
  computed: {
    ...mapGetters({ $lang: "personalSiteCurrentLanguage" }),
  },
  methods: {
    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    async selectLanguage(language) {
      await this.$router.push("/home");
      this.$store.commit("setCurrentLanguageLessons", language);
    },
    closePopup() {
      window.localStorage.setItem("hasSeenPopup", true);
      this.showPopup = false;
    },
  },
};
</script>
<style scoped lang="scss">
.home {
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  margin: 0;
  padding: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.img-container {
  width: 260px;
  height: 230px;
  border-radius: 15px;
  margin: 3rem;
  background-color: #444;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
img {
  position: absolute;
  border-radius: 20% 20% 0 0;
  top: -30px;
}
.title {
  position: absolute;
  bottom: 0.5rem;
  color: aliceblue;
}
.img-container:hover {
  cursor: pointer;
  transform: scale(1.01);
  box-shadow: 1px 3px 5px #243548;
}
.world-map {
  height: 100vh;
  position: absolute;
  bottom: 0;
}
.star {
  background: #ddd;
  border-radius: 50%;
  position: absolute;
  animation: travel 120s infinite;
}
@keyframes travel {
  0% {
    transform: translate(0);
  }
  50% {
    transform: translate(-20rem, -10rem);
  }
  100% {
    transform: translate(0);
  }
}
.footer-nav {
  position: absolute;
  width: 100vw;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  a {
    text-decoration: none;
    color: #ddd;
    font-weight: bold;
    margin: 0 0.5rem;
  }
  #bottom-left-arrow {
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
  }
  #bottom-middle-arrow {
    transform: rotate(50deg);
  }
  .nav-item {
    padding: 0.5rem;
    font-size: 2rem;
  }
  .nav-item:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
  .router-link-active,
  .router-link-exact-active {
    text-decoration: underline;
    text-decoration-color: rgb(150, 2, 255);
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 1s;
}
.slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateY(15rem);
}

@media only screen and (max-width: 550px) {
  .footer-nav {
    position: absolute;
    width: 100vw;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    a {
      color: #ddd;
      font-weight: bold;
      margin: 0 0.5rem;
    }
    #bottom-left-arrow,
    #bottom-middle-arrow,
    #bottom-right-arrow {
      display: none;
    }
    .nav-item {
      padding: 0.5rem;
      font-size: 1rem;
    }
    .nav-item:hover {
      cursor: pointer;
      transform: scale(1.05);
    }
  }
}
</style>
