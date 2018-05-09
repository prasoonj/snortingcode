/**
* A simple parser that, given an input asserts the validity
* on the basis of a FSM that defines the language.
**/

object Parser {
  type State = String

  /**
  * The `parser` function takes a value of type `A` and returns
  * the value parsed from the value `a` along with
  * a list of `continuations` (a list of the next possible states).
  **/
  def parser[A](a: A): List[(A, State)] = ???

  def basicParser(a: String): List[(Char, State)] = a match {
    case "" => List()
    case a => List((a.head, a.tail))
  }

  trait Monad[A]
  object Monad {
    // The `unit` funtion
    def apply[A](a: A, state: State): Monad[A] = Monad(a, state)

    // The flatMap function
    def flatMap[A, B](m: Monad[A], f: A => Monad[B]): Monad[B] =


  }

  def main(arg: Array[String]) {
    // Basic Parser
    println(basicParser("monad"))
    assert(basicParser("monad") == List(('m', "onad")))
  }

}
