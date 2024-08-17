import { db } from '../db.js'

export const getIssues = (_, res) => {
	const q = 'SELECT * FROM issues'

	db.query(q, (err, data) => {
		if (err) return res.json(err)

		return res.status(200).json(data)
	})
}

export const addIssue = (req, res) => {
	const q =
	  "INSERT INTO issues(`title`, `description`) VALUES(?)";
  
	const values = [
	  req.body.title,
	  req.body.description,
	];
  
	db.query(q, [values], (err) => {
	  if (err) return res.json(err);
  
	  return res.status(200).json("Issue successful created.");
	});
  };
  
  export const updateIssue = (req, res) => {
	const q =
	  "UPDATE issues SET `title` = ?, `description` = ? WHERE `id` = ?";
  
	const values = [
	  req.body.title,
	  req.body.description
	];
  
	db.query(q, [...values, req.params.id], (err) => {
	  if (err) return res.json(err);
  
	  return res.status(200).json("Issue successful updated.");
	});
  };
  
  export const deleteIssue = (req, res) => {
	const q = "DELETE FROM issues WHERE `id` = ?";
  
	db.query(q, [req.params.id], (err) => {
	  if (err) return res.json(err);
  
	  return res.status(200).json("Issue successful deleted.");
	});
  };
