import React, { FC } from "react";
import {  useNewApplicationState } from "src/stores/ApplicationsState";
import { ApplicationType } from "@project/components/src/interfaces/ApplicationDto";
import { useEffect } from "react";
import { useUserStatuseStore } from "src/stores/UserStatuseStore";
import { useParams,useNavigate } from "react-router-dom";
import { MY_APPLICATIONS_ROUTE, PROFILE_ROUTE, SIGN_IN_ROUTE } from "src/constants";
import { Preload } from "@project/components/src/ui-kit/Preload";

export const CreateApplication: FC = () => {
  const { applicationType, entityId } = useParams();
  const navigate = useNavigate();
  const { saveCreateApplication, createApplicationReq,clearCreateApplication, sendCreateApplication, createApplicationId } = useNewApplicationState();
  const {isNotAuthorized, isNotRegistrationComplite } = useUserStatuseStore()

  useEffect(()=>{
    if (Object.values(ApplicationType).includes(applicationType as ApplicationType)) {
      saveCreateApplication(applicationType as ApplicationType, Number(entityId))
    }
  },[])

  useEffect(()=>{
    if (isNotAuthorized) {
      navigate(SIGN_IN_ROUTE)
    } else if (isNotRegistrationComplite) {
      navigate(PROFILE_ROUTE)
    }else if (createApplicationId) {
      clearCreateApplication(),
      navigate(MY_APPLICATIONS_ROUTE.replace(':applicationId',createApplicationId.toString()))
    }else if(createApplicationReq){
      sendCreateApplication()
    }else{
      //navigate(PROFILE_ROUTE)
    }
  },[createApplicationReq,createApplicationId,isNotAuthorized,isNotRegistrationComplite])

  return (
    <Preload isLoading/>
  );
};
