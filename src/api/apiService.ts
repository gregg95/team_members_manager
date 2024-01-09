import axios from '../axiosSetup';
import { NewTeamMember, RandomTeamMember, TeamMember, TeamMemberStatus, UpdatedTeamMember } from './types';

const fetchAllTeamMembers = async (): Promise<TeamMember[]> => {
  try {
    const url = 'teamMember';
    return (await axios.get(url)).data;
  } catch (error) {
    throw error;
  }
};

const fetchTeamMemberById = async (id: string): Promise<TeamMember> => {
  try {
    const url = `teamMember/${id}`;
    return (await axios.get(url)).data;
  } catch (error) {
    throw error;
  }
};

const createTeamMember = async (newTeamMember: NewTeamMember): Promise<string> => {
  try {
    const url = `teamMember`;

    const formData = new FormData();

    if (newTeamMember.photoFile) {
      formData.append('photoFile', newTeamMember.photoFile);
    }

    formData.append('name', newTeamMember.name);
    formData.append('email', newTeamMember.email);
    formData.append('phoneNumber', newTeamMember.phoneNumber);

    return (
      await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    ).data;
  } catch (error) {
    throw error;
  }
};

const importTeamMember = async (): Promise<string> => {
  try {
    const url = `teamMember/import`;
    return (await axios.post(url)).data;
  } catch (error) {
    throw error;
  }
};

const updateTeamMemberStatus = async (id: string, newState: TeamMemberStatus): Promise<void> => {
  try {
    const url = `teamMember/${id}/${newState === TeamMemberStatus.Active ? 'activate' : 'block'}`;
    return (await axios.patch(url)).data;
  } catch (error) {
    throw error;
  }
};

const updateTeamMember = async (id: string, updatedTeamMember: UpdatedTeamMember): Promise<void> => {
  try {
    const url = `teamMember/${id}`;
    return (await axios.put(url, updatedTeamMember)).data;
  } catch (error) {
    throw error;
  }
};

const fetchRandomUserFromExternalAPI = async (): Promise<RandomTeamMember> => {
  try {
    const url = 'https://randomuser.me/api/';

    const response = await axios.get(url);
    const randromUserData = response.data.results[0];

    const randomTeamMember: RandomTeamMember = {
      name: `${randromUserData.name.first} ${randromUserData.name.last}`,
      email: randromUserData.email,
      phoneNumber: randromUserData.phone,
    };

    return randomTeamMember;
  } catch (error) {
    throw error;
  }
};

export {
  fetchAllTeamMembers,
  createTeamMember,
  updateTeamMemberStatus,
  fetchRandomUserFromExternalAPI,
  importTeamMember,
  fetchTeamMemberById,
  updateTeamMember,
};
