export type TeamMember = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  status: TeamMemberStatus;
  createdAtDateTime: Date;
};

export type NewTeamMember = {
  name: string;
  email: string;
  phoneNumber: string;
  photoFile?: null | File;
};

export type UpdatedTeamMember = {
  name: string;
  email: string;
  phoneNumber: string;
};

export enum TeamMemberStatus {
  Active,
  Blocked,
}

export enum ModalOption {
  AddTeamMember,
  TeamMemberProfile,
  Confirmation,
}

export type RandomTeamMember = {
  name: string;
  email: string;
  phoneNumber: string;
};
