import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import Loading from '../components/Loading';
import useCompleted from '../hooks/useCompleted';
import useModules from '../hooks/useModules';
import useRelated from '../hooks/useRelated';
import useService from '../hooks/useService';
import useSubscribed from '../hooks/useSubscribed';
import useTermsAndConditions from '../hooks/useTermsAndConditions';
import { autologin } from '../services/User';

export default function AutoLogin() {
  const router = useRouter();
  const { mutateService } = useService();
  const { mutateCompletionStatus } = useCompleted();
  const { mutateModules } = useModules();
  const { mutateRelated } = useRelated();
  const { mutateSubscriptionStatus } = useSubscribed();
  const { mutatePage } = useTermsAndConditions();

  useEffect(() => {
    const { welcome, t } = router.query;

    autologin(t);
    mutateService();
    mutateCompletionStatus();
    mutateModules();
    mutateRelated();
    mutateSubscriptionStatus();
    mutatePage();

    router.push(welcome ? '/?welcome=true' : '/');
  }, [
    router,
    mutateService,
    mutateCompletionStatus,
    mutateModules,
    mutateRelated,
    mutateSubscriptionStatus,
    mutatePage,
  ]);

  return <Loading />;
}

AutoLogin.getInitialProps = async (context) => ({ t: context.query.t });
