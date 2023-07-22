import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import api from '../api';

const useApiAuth = () => {
	const { data: session, status } = useSession();
	const [isLoadingApi, setLoadingApi] = useState(true);

	useEffect(() => {
		if (status === 'authenticated') {
			setLoadingApi(false);
			api.interceptors.request.use(config => {
				config.headers['Authorization'] = `Bearer ${session?.user.accessToken}`;

				return config;
			});
		}
	}, [session, status, setLoadingApi]);

	return { apiAuth: api, isLoadingApi };
};

export default useApiAuth;
