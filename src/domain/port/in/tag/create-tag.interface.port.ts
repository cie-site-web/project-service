import { TagEntity } from "src/domain/entities/tag.entity";

export interface CreateTagCommand {
  name: string;
  description: string;
}

export interface CreateTagInterfacePort {
  execute(command: CreateTagCommand): Promise<TagEntity>;
}
