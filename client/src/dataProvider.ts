import {
  CreateParams,
  CreateResult,
  DataProvider,
  DeleteManyParams,
  DeleteManyResult,
  DeleteParams,
  DeleteResult,
  GetListParams,
  GetListResult,
  GetManyParams,
  GetManyReferenceParams,
  GetManyReferenceResult,
  GetManyResult,
  GetOneParams,
  GetOneResult,
  Identifier,
  QueryFunctionContext,
  RaRecord,
  UpdateManyParams,
  UpdateManyResult,
  UpdateParams,
  UpdateResult,
} from "react-admin";

const baseUrl = "http://localhost:3000"; // todo

function getListQueryString(params: GetListParams): string {
  return new URLSearchParams({
    pageNumber: (params.pagination?.page ?? 0).toString(),
    pageSize: (params.pagination?.perPage ?? 10).toString(),
    sortBy: params.sort?.field ?? "",
    sortOrder: params.sort?.order ?? "",
  }).toString();
}

const dataProvider: DataProvider = {
  async getList<RecordType extends RaRecord>(
    resource: string,
    params: GetListParams & QueryFunctionContext,
  ): Promise<GetListResult<RecordType>> {
    const query = getListQueryString(params);
    const resp = await fetch(`${baseUrl}/${resource}?${query}`);
    return resp.json();
  },
  async getOne<RecordType extends RaRecord>(
    resource: string,
    params: GetOneParams<RecordType> & QueryFunctionContext,
  ): Promise<GetOneResult<RecordType>> {
    const resp = await fetch(`${baseUrl}/${resource}/${params.id}`);
    return resp.json();
  },
  async create<
    RecordType extends Omit<RaRecord, "id">,
    ResultRecordType extends RaRecord = RecordType & { id: Identifier },
  >(
    resource: string,
    params: CreateParams,
  ): Promise<CreateResult<ResultRecordType>> {
    const resp = await fetch(`${baseUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return resp.json();
  },
  async update<RecordType extends RaRecord>(
    resource: string,
    params: UpdateParams,
  ): Promise<UpdateResult<RecordType>> {
    const resp = await fetch(`${baseUrl}/${resource}/${params.id}`, {
      method: "PATCH",
      body: JSON.stringify(params.data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return resp.json();
  },
  async delete<RecordType extends RaRecord>(
    resource: string,
    params: DeleteParams<RecordType>,
  ): Promise<DeleteResult<RecordType>> {
    const resp = await fetch(`${baseUrl}/${resource}/${params.id}`, {
      method: "DELETE",
    });
    return resp.json();
  },
  async deleteMany<RecordType extends RaRecord>(
    resource: string,
    params: DeleteManyParams<RecordType>,
  ): Promise<DeleteManyResult<RecordType>> {
    const resp = await fetch(`${baseUrl}/${resource}/deleteMany`, {
      method: "POST",
      body: JSON.stringify({ ids: params.ids }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return resp.json();
  },
  getMany<RecordType extends RaRecord>(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _resource: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _params: GetManyParams<RecordType> & QueryFunctionContext,
  ): Promise<GetManyResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
  getManyReference<RecordType extends RaRecord>(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _resource: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _params: GetManyReferenceParams & QueryFunctionContext,
  ): Promise<GetManyReferenceResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
  updateMany<RecordType extends RaRecord>(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _resource: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _params: UpdateManyParams,
  ): Promise<UpdateManyResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
};

export default dataProvider;
