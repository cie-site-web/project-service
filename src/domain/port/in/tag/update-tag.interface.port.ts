import { TagEntity } from "src/domain/entities/tag.entity";
import { GetTagQuery } from "./get-tag.interface.port";

export interface UpdateTagCommand {
  name?: string;
  description?: string;
}

export interface UpdateTagInterfacePort {
  execute(query: GetTagQuery, command: UpdateTagCommand): Promise<TagEntity>;
}
