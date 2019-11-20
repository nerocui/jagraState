import Axios from 'axios';
import TYPE from './type';
import { TaskForCreationDto } from '../models';

const RootUrl = 'https://jagra.azurewebsites.net';

function DispatchLogin(token: string) {
	return {
		type: TYPE.LOGIN,
		payload: token,
	};
}

function DispatchLogout() {
	return {
		type: TYPE.LOGOUT,
		payload: '',
	};
}

function SetTheme(theme: string) {
	return {
		type: TYPE.SET_THEME,
		payload: theme,
	};
}

function SetOrganizations(organizations: Array<any>) {
	return {
		type: TYPE.SET_ORGANIZATIONS,
		payload: organizations,
	};
}

function SetOrganization(org: any) {
	return {
		type: TYPE.SET_ORGANIZATION,
		payload: org,
	};
}

function AddTask(task: any) {
	return {
		type: TYPE.ADD_TASK,
		payload: task,
	};
}

export function CreateTask(task: TaskForCreationDto) {
	return (dispatch: any) => {
		Axios.post(RootUrl + '/api/task/create', {...task})
			.then(res => {
				dispatch(AddTask(res.data));
			})
			.catch(err => {
				console.log(err);
			});
	};
}

export function FetchOrganizationById(id: number) {
	return (dispatch: any) => {
		Axios.get(RootUrl + '/api/organization/' + id.toString())
			.then(res => {
				console.log(res);
				dispatch(SetOrganization(res.data));
			})
			.catch(err => {
				console.log(err);
			});
	};
}

export function FetchOrganizationsByUser(userId: number) {
	return (dispatch: any) => {
		Axios.get(RootUrl + '/api/organization/byuser?userId=' + userId.toString())
			.then(res => {
				dispatch(SetOrganizations(res.data));
			})
			.catch(err => {
				console.log(err);
			});
	};
}

export function Login(username: string, password: string) {
	return (dispatch: any) => {
		Axios.post(RootUrl + '/api/auth/login', {username, password})
			.then(res => {
				const { token } = res.data;
				localStorage.setItem('token', token);
				dispatch(DispatchLogin(token));
			})
			.catch(err => {
				console.log('Auth Error: ', err);
			});
	};
}

export function Logout() {
	return (dispatch: any) => {
		localStorage.setItem('token', '');
		dispatch(DispatchLogout());
	};
}

export function ToggleTheme(loadTheme: any, value: any) {
	return (dispatch: any) => {
		const theme = localStorage.getItem('theme');
		if (theme === 'light') {
			localStorage.setItem('theme', 'dark');
			loadTheme(value);
			dispatch(SetTheme('dark'));
		} else {
			localStorage.setItem('theme', 'light');
			loadTheme(value);
			dispatch(SetTheme('light'));
		}
	}
}
