import suggestedQuestions from "../data/suggestedQuestions.js";

export function getSuggestions(req, res) {
  res.json(suggestedQuestions);
}
