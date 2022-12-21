import { HandleRequestParams } from '../models/contracts';
export type RouterParams = {
    method: string | undefined;
    endpoint: string | undefined;
} & HandleRequestParams;
declare const router: ({ method, endpoint, emitter, response, request }: RouterParams) => void;
export default router;
