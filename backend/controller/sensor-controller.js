/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

/*-------------------------------------------------------------*/
/*DECLARATION AND INITIALIZATION*/
/*-------------------------------------------------------------*/

/*-------------------------------------------------------------*/
/*MAIN*/
/*-------------------------------------------------------------*/

const register = async (req, res) => {
  try {
    res.status(200).json({ result: reservations });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

const transferdata = async (req, res) => {
  try {
    res.status(200).json(reservationWithUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

/*-------------------------------------------------------------*/
/*EXPORTS*/
/*-------------------------------------------------------------*/
export default { register, transferdata };
