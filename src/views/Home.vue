<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    {{ name }}
    {{ projName }}
    {{ person.name }}
    {{ allPersonCount }}
    {{ $t("message") }}
    <button type="button" @click="test()">test</button>
    <button type="button" @click="test1()">test1</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator"
import HelloWorld from "@/components/HelloWorld.vue" // @ is an alias to /src
import { namespace } from "vuex-class"
const user = namespace("User")

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  public projName: string = "My project"
  public person: person = {
    name: "tom",
    age: 26
  }
  @user.Getter("getName")
  public name!: string

  @user.Mutation("setName")
  public mutationName!: (n: string) => void

  @user.Action("updateName")
  public updateName!: (n: string) => void

  public get allPersonCount(): string {
    return 10 + this.projName
  }

  mounted(): void {
    this.$bus.$on("test", () => {
      console.log(5555)
    })
  }

  @Watch("projName", { immediate: true, deep: true })
  projNameChange(newVal: string, oldVal: string): void {
    console.log(newVal)
    console.log(oldVal)
  }

  public test(): void {
    // this.$store.dispatch("updateName", "123")
    this.updateName("123")
  }

  public test1(): void {
    this.projName = "project2"
    this.$bus.$emit("test")

    this.mutationName("test1")
  }
}
export interface person {
  name: string
  age: number
}
</script>
