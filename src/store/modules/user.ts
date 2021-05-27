import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators"
@Module({ namespaced: true })
class Uesr extends VuexModule {
  public name: string = "testest"

  get getName(): string {
    return this.name
  }

  @Mutation
  public setName(newName: string): void {
    this.name = newName
  }

  @Action({ rawError: true })
  public updateName(newName: string): void {
    this.context.commit("setName", newName)
  }
}

export default Uesr
