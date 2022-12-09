export type TokenProps = {
  token: string;
};

export type UserProps = {
  identifier: string;
  password: string;
};
export type usersData = {
  id: number;
  email: string;
  username: string;
  cpf: string;
  role: UsersDataRole;
  created_for: Created_forData;
  updated_for: Updated_forData;
  createdAt: string;
  updatedAt: string;
  status: boolean;
};

export type UsersDataRole = {
  id: number;
  name: string;
  type: string;
};

type Updated_forData = {
  id: number;
  username: string;
  email: string;
};

type Created_forData = {
  id: number;
  username: string;
  email: string;
};

export type Vehicle = {
  brand: string;
  model: string;
  code: string;
  potency: string;
  proprietary_type: number;
  color: string;
  year: string;
  plate: string;
  fuel: string;
  vehicle_type: string;
  gearshift_type: string;
  equipment_name: string;
  patrimony_code: string;
  capacity: string;
  owner_name: string;
  created_for?: number;
  updated_for?: number;
};

export type VehicleData = {
  id: number;
  attributes: Vehicle;
};

export type Created_forData_vehicle = {
  data: {
    id: number;
    attributes: {
      username: string;
    };
  };
};
export type Updated_forData_vehicle = {
  data: {
    id: number;
    attributes: {
      username: string;
    };
  };
};

export type VehiclesData = {
  id: number;
  attributes: {
    brand: string;
    model: string;
    code: string;
    potency: string;
    proprietary_type: number;
    color: string;
    year: string;
    plate: string;
    vehicle_type: string;
    fuel: string;
    gearshift_type: string;
    equipment_name: string;
    patrimony_code: string;
    capacity: string;
    owner_name: string;
    status: boolean;
    created_for: Created_forData_vehicle;
    updated_for: Updated_forData_vehicle;
    createdAt: string;
    updatedAt: string;
  };
};

type Created_forData_functionary = {
  data: {
    id: number;
    attributes: {
      username: string;
      email: string;
    };
  };
};
type Updated_forData_functionary = {
  data: {
    id: number;
    attributes: {
      username: string;
      email: string;
    };
  };
};

export type Functionary = {
  id: number;
  attributes: {
    name: string;
    cost_center: string;
    cpf: string;
    email: string;
    registration: string;
    cnh: string;
    category_cnh: string;
    expiration_date_cnh: string;
    function: string;
    created_at: string;
    updated_at: string;
    status: boolean;
    observation: string;
    state: string;
    city: string;
    zip_code: string;
    district: string;
    street: string;
    complement: string;
    phone_number: string;
    admission_date: string;

    number: string;
    created_for: Created_forData_functionary;
    updated_for: Updated_forData_functionary;
  };
};

export type Cost_Center = {
  id: number;
  attributes: {
    code: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    status: string;
  };
};

export type ReportControllBoardData = {
  id: number;
  attributes: {
    initial_km: string;
    final_km: string;
    origin: string;
    destination: string;
    refuelling_status: boolean;
    refuel_qty: number;
    refuel_unit_value: number;
    refuel_total_value: number;
    type_of_fuel: string;
    createdAt: string;
    updatedAt: string;
    functionary_id: {
      data: Functionary;
    };
    vehicle_id: {
      data: VehiclesData;
    };
    cost_center_id: {
      data: Cost_Center;
    };
    created_for: {
      data: {
        id: number;
        attributes: {
          username: string;
          email: string;
        };
      };
    };
    updated_for: {
      data: {
        id: number;
        attributes: {
          username: string;
          email: string;
        };
      };
    };
  };
};

export type Option = {
  value: string;
  label: string;
};

export type IContext = {
  authenticate: (identifier: string, password: string) => Promise<void>;
  signOut: () => void;
  islogged: () => boolean;
  token: TokenProps;
  user: usersData;
  setLoading: (value: boolean) => void;
  loading: boolean;
};

export type IAuthProvider = {
  children: JSX.Element;
};

export type CreatedForData = {
  data: {
    id: number;
    attributes: {
      username: string;
    };
  };
};

export type UpdatedForData = {
  data: {
    id: number;
    attributes: {
      username: string;
    };
  };
};

export type CostCenterData = {
  id: number;
  attributes: {
    code: string;
    description: string;
    created_for?: CreatedForData;
    status: boolean;
    createdAt: string;
  };
};

export type Collaborator = {
  name: string;
  cpf: string;
  email?: string | null;
  registration: string;
  admission_date: string;
  function: number;
  phone_number: string;
  cnh?: string;
  expiration_date_cnh: string;
  category_cnh: string;
  state: string;
  city: string;
  zip_code: string;
  district: string;
  street: string;
  number: string;
  complement: string;
  observation: string;
  created_for?: number;
  updated_for?: number;
};

export type CollaboratorsData = {
  id: number;
  attributes: {
    name: string;
    cpf: string;
    email?: string | null;
    registration: string;
    admission_date: string;
    function: number;
    phone_number: string;
    cnh?: string;
    expiration_date_cnh: string;
    category_cnh: string;
    state: string;
    city: string;
    zip_code: string;
    district: string;
    street: string;
    number: string;
    complement: string;
    status: boolean;
    observation: string;
    created_for: CreatedForData;
    updated_for: UpdatedForData;
    createdAt: string;
    updatedAt: string;
  };
};
