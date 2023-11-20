import Appontment from "../model/appointment.js";

export const addAppointment = (req, res) => {
	Appontment.create({
		name: req.body.name,
		email: req.body.email,
		number: req.body.phone,
	})
		.then(() => {
			res.redirect("/");
		})
		.catch((err) => {
			console.log(err);
		});
};

export const getAppointments = (req, res) => {
	Appontment.findAll()
		.then((appointments) => {
			res.send(appointments);
		})
		.catch((err) => {
			console.log(err);
		});
};

export const deleteAppointments = (req, res) => {
	Appontment.destroy({ where: { id: req.params.id } })
		.then(() => {})
		.catch((err) => {
			console.log(err);
		});
};
