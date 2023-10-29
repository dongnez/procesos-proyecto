import { useNavigate as useNavigate_ } from 'react-router-dom';

export const useNavigate = () => {
	const navigate = useNavigate_();
	return navigate
}