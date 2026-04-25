export interface DeleteProjectTagCommand {
  publicId: string;
}

export interface DeleteProjectTagInterfacePort {
  execute(command: DeleteProjectTagCommand): Promise<void>;
}
