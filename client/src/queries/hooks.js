import QUERY_KEYS from "./queryKeys";
import { useQuery } from '@tanstack/react-query';
import {
	getEmployee,
	getAdmin,
	trackStatus,
	listDocument,
	getRooms,
	loadMessages,
	getYourApprovedDocuments,
	getYourRejectedDocuments,
	getDocument,
} from "../services";

export const useEmployeeInfo = (params) => {
	return useQuery(
		[QUERY_KEYS.GET_EMPLOYEE, params.departmentId, params.employeeId],
		() => getEmployee(params),
		{
			retry: false,
		}
	);
}

export const useAdminInfo = (params) => {
	return useQuery(
		[QUERY_KEYS.GET_ADMIN, params.departmentId, params.employeeId],
		() => getAdmin(params),
		{
			retry: false,
		}
	);
}

export const useTrackStatus = (params) => {
	return useQuery(
		[QUERY_KEYS.TRACK_STATUS, params.documentId, params.employeeId],
		() => trackStatus(params),
		{
			retry: false,
		}
	);
}

export const useListDocument = (params) => {
	return useQuery(
		[QUERY_KEYS.LIST_DOCUMENT, params.employeeId],
		() => listDocument(params),
		{
			retry: false,
		}
	);
}

export const useRooms = (params) => {
	return useQuery(
		[QUERY_KEYS.GET_ROOMS, params.employeeId],
		() => getRooms(params),
		{
			retry: false,
		}
	);
}

export const useLoadMessages = (params) => {
	return useQuery(
		[QUERY_KEYS.LOAD_MESSAGES, params.employeeId, params.pageNo, params.filter],
		() => loadMessages(params),
		{
			retry: false,
		}
	);
}

export const useYourApprovedDocuments = (params) => {
	return useQuery(
		[QUERY_KEYS.YOUR_APPROVED_DOCUMENTS, params.employeeId],
		() => getYourApprovedDocuments(params),
		{
			retry: false,
		}
	);
}

export const useYourRejectedDocuments = (params) => {
	return useQuery(
		[QUERY_KEYS.YOUR_REJECTED_DOCUMENTS, params.employeeId],
		() => getYourRejectedDocuments(params),
		{
			retry: false,
		}
	);
}

export const useDocument = (params) => {
	return useQuery(
		[QUERY_KEYS.YOUR_REJECTED_DOCUMENTS, params.documentId, params.employeeId, params.role],
		() => getDocument(params),
		{
			retry: false,
		}
	);
}