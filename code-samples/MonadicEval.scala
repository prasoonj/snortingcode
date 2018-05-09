/**
* The monad is designed to be able to capture and assist the
* transitions on the state it encapsulates.
* We need 3 things to be able to do that:
* 1. A constructor for the Monad for the required type.
* 2. A way to return M[A]
* 3. A way to apply a function (A -> M[B]) to M[A]
**/
object MonadEval {

  sealed trait Term
  case class Con(a: Int) extends Term
  case class Div(a: Term, b: Term) extends Term

  case class IMonad[A](a: A) {
    def flatMap[B](f: (A => IMonad[B])): IMonad[B] = f(a)
  }

  def basicEval(t: Term): IMonad[Int] = t match {
    case Con(a) => IMonad(a)
    case Div(t, u) => basicEval(t).flatMap {
      x => basicEval(u).flatMap {
        y => IMonad(x/y)}}
  }

  // Exceptions Monad
  object EMonad {
    def flatMap[A, B]
  }
  abstract class EMonad[+A] {

  }
  case class Raise[A](e: Exception) extends EMonad[A]
  case class Return[A](a: A) extends EMonad[A]
  type Exceptions = String






  def main(args: Array[String]) {

    val answer = Div(Div(Con (1972), Con(2)), Con(23))
    val error = Div(Con (1), Con(0))

    // Basic
    assert(basicEval(answer) == IMonad(42))
  }

}
