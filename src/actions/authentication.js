import { signUp } from "../services/authentication";
import { useSelector, useDispatch } from 'react-redux';

const dispatch = useDispatch();
export const signUpAction = (dispatch) = info => {
    return signUp(info)
}