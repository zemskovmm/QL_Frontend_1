
export enum ApplicationType {
    University = 'University',
    Course = 'Course',
    Housing = 'Housing',
    Visa = 'Visa',
}

export enum ApplicationStatus {
    New = 'New',
    NeedsResponse = 'NeedsResponse',
    Review = 'Review',
    SentToEntity = 'SentToEntity',
    Fulfilled = 'Fulfilled',
}


export type ApplicationDto = {
    id: number,
    type: ApplicationType,
    entityId: number,
    status: ApplicationStatus,
    commonApplicationInfo: any,
    entityTypeSpecificApplicationInfo: any,
};

export const APPLICATION_DTO_DEFAULT:ApplicationDto = {
    id: 0,
    type: ApplicationType.University,
    entityId: 0,
    status: ApplicationStatus.New,
    commonApplicationInfo: {},
    entityTypeSpecificApplicationInfo: {},
}

export type ApplicationsPagesDto = {
    totalPages: number;
    totalItems: number;
    items: Array<ApplicationDto>;
};