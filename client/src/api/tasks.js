import axios from "./axios"

export const createTaskRequest = (task) => axios.post('/create-task', task)

export const getTasksRequest = () => axios.get('/get-tasks')

export const updateTaskRequest = (task, id) => axios.put(`/edit-task/${id}`, task)

export const taskStatusRequest = (task, id) => axios.put(`/task-status/${id}`, task)

export const deleteTaskRequest = (id) => axios.delete(`/delete-task/${id}`)