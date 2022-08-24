import { useMutation } from '@tanstack/react-query';
import {
  login,
  createEmployee,
  createDocument,
  assignDocument,
  forwardToAdmin,
  rejectDocument,
} from '../services';

export const useMutateLogin = ({ onSuccess, onError, onMutate }) => {
  return useMutation((data) => login(data), {
    onSuccess: (result) => {
      typeof onSuccess && onSuccess(result);
    },
    onError: async (err) => {
      typeof onError && onError(err);
    },
    onMutate: async (data) => {
      typeof onMutate && onMutate(data);
    }
  });
};

export const useMutateCreateEmployee = ({ onSuccess, onError, onMutate }) => {
  return useMutation((data) => createEmployee(data), {
    onSuccess: (result) => {
      typeof onSuccess && onSuccess(result);
    },
    onError: async (err) => {
      typeof onError && onError(err);
    },
    onMutate: async (data) => {
      typeof onMutate && onMutate(data);
    }
  });
}

export const useMutateCreateDocument = ({ onSuccess, onError, onMutate }) => {
  return useMutation((data) => createDocument(data), {
    onSuccess: (result) => {
      typeof onSuccess && onSuccess(result);
    },
    onError: async (err) => {
      typeof onError && onError(err);
    },
    onMutate: async (data) => {
      typeof onMutate && onMutate(data);
    }
  });
}

export const useMutateAssignDocument = ({ onSuccess, onError, onMutate }) => {
  return useMutation((data) => assignDocument(data), {
    onSuccess: (result) => {
      typeof onSuccess && onSuccess(result);
    },
    onError: async (err) => {
      typeof onError && onError(err);
    },
    onMutate: async (data) => {
      typeof onMutate && onMutate(data);
    }
  });
}

export const useMutateForwardToAdmin = ({ onSuccess, onError, onMutate }) => {
  return useMutation((data) => forwardToAdmin(data), {
    onSuccess: (result) => {
      typeof onSuccess && onSuccess(result);
    },
    onError: async (err) => {
      typeof onError && onError(err);
    },
    onMutate: async (data) => {
      typeof onMutate && onMutate(data);
    }
  });
}

export const useMutateRejectDocument = ({ onSuccess, onError, onMutate }) => {
  return useMutation((data) => rejectDocument(data), {
    onSuccess: (result) => {
      typeof onSuccess && onSuccess(result);
    },
    onError: async (err) => {
      typeof onError && onError(err);
    },
    onMutate: async (data) => {
      typeof onMutate && onMutate(data);
    }
  });
}