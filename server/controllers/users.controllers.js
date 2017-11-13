/* Import Models */
import { User } from '../models/users.models'

/* Home */
export function home(req, res) {
    res.render('index', {html: 'Hello'})
}

