export interface DeleteProjectCommand {
  publicId: string;
}

export interface DeleteProjectInterfacePort {
  execute(command: DeleteProjectCommand): Promise<void>;
}
