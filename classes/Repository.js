export default class Repository {
  static ghosts = 0;

  static incrementGhost() {
    const previousValue = Repository.ghosts
    Repository.ghosts++
    return previousValue
  }
}
