
object NonMonad {
  sealed trait Term
  case class Con(a: Int) extends Term
  case class Div(a: Term, b: Term) extends Term

  // Basic evaluator
  def basicEval(term: Term): Int = term match {
    case Con(a) => a
    case Div(a, b) => eval(a)/eval(b)
  }

  //>>>> Exceptions
  sealed trait MExceptions
  type Exception = String
  case class Raise(e: Exception) extends MExceptions
  case class Return(a: Int) extends MExceptions

  def exceptionEval(term: Term): MExceptions = term match {
    case Con(a) => Return(a)
    case Div(a, b) => exceptionEval(a) match {
      case Raise(e) => Raise(e)
      case Return(a) => exceptionEval(b) match {
        case Raise(e) => Raise(e)
        case Return(b) =>
          if(b==0) Raise("Divide by zero!")
          else Return(a/b)
      }
    }
  }

  //>>>> Managing state
  case class MState[A](a: A, s: State)
  type State = Int

  def stateEval(term: Term, x: State): MState[Int] = term match {
    case Con(a) => MState(a, x)
    case Div(t, u) =>
      val MState(a, y) = stateEval(t, x)
      val MState(b, z) = stateEval(u, y)
      MState(a/b, z+1)
  }

  //>>>> Output
  type MOutput[A] = (Output, A)
  type Output = String

  def outputEval(term: Term): MOutput[Int] = term match {
    case Con(a) => (line(Con (a), a), a)
    case Div(t, u) =>
      val (x, a) = outputEval(t)
      val (y, b) = outputEval(u)
      val result = a/b
      (x + y + line(Div(t, u), result), result)
  }

  def line(t: Term, a: Int): Output = "eval(" + showterm(t) + ") <= " + a.toString + "\n"
  def showterm(t: Term): String = t match {
    case Con(a) => "Con(" + a.toString + ")"
    case Div(t, u) => "Div(" + t.toString + ", " + u.toString + ")"
  }

  def main(args: Array[String]) {

    val answer = Div(Div(Con (1972), Con(2)), Con(23))
    val error = Div(Con (1), Con(0))

    // Basic
    assert(basicEval(answer) == 42)
    // java.lang.ArithmeticException: / by zero
    // eval(Div(Con (1), Con(0)))

    // Exceptions
    assert(exceptionEval(Div(Div(Con (1972), Con(2)), Con(23))) == Return(42))
    assert(exceptionEval(Div(Con (1), Con(0))) == Raise("Divide by zero!"))

    // State Evaluator
    assert(stateEval(answer, 0) == MState(42, 2))

    // Outuput Evaluator
    /*
    eval(Con(1972)) <= 1972
    eval(Con(2)) <= 2
    eval(Div(Con(1972), Con(2))) <= 986
    eval(Con(23)) <= 23
    eval(Div(Div(Con(1972),Con(2)), Con(23))) <= 42

    */
    println(outputEval(answer)._1)

  }
}
