import { GraphQLError } from "graphql";
import userService from "../services/user.service";
import commentService from "../services/comment.service";
import reactionService from "../services/reaction.service";

export const resolvers = {
    Query: {
        user: async (_: any, { id }: { id: string }, context: any) => {
            try {
                const user = await userService.findById(id);
                if (!user) throw createGraphQLError(`User with id ${id} not found`, "NOT_FOUND");
                return user;
            } catch (error) {
                throw handleError(error);
            }
        },
        users: async (_: any) => {
            try {
                return await userService.findAll();
            } catch (error) {
                throw handleError(error);
            }
        },
        comments: async (_: any) => {
            try {
                return await commentService.findAll();
            } catch (error) {
                throw handleError(error);
            }
        },
        commentByParent: async (_: any, { parentId }: { parentId: string }) => {
            try {
                return await commentService.findByParentId(parentId);
            } catch (error) {
                throw handleError(error);
            }
        },
        getComment: async (_: any, { id }: { id: string }) => {
            try {
                const comment = await commentService.findById(id);
                if (!comment) throw createGraphQLError(`Comment with id ${id} not found`, "NOT_FOUND");
                return comment;
            } catch (error) {
                throw handleError(error);
            }
        },
        reactionsByComment: async (_: any, { commentId }: { commentId: string }) => {
            try {
                return await reactionService.findByCommentId(commentId);
            } catch (error) {
                throw handleError(error);
            }
        },
    },

    Mutation: {
        createUser: async (_: any, { input }: { input: any }, context: any) => {
            try {
                // Verificar si el usuario es superadmin
                if (context.user.role !== 'superadmin') {
                    throw createGraphQLError("Forbidden: Only superadmin can create users", "FORBIDDEN");
                }
                return await userService.create(input);
            } catch (error) {
                throw handleError(error);
            }
        },
        login: async (_: any, { input }: { input: any }) => {
            try {
                return await userService.login(input);
            } catch (error) {
                throw handleError(error);
            }
        },
        updateUser: async (_: any, { id, input }: { id: string; input: any }, context: any) => {
            try {
                // Verificar si el usuario es superadmin
                if (context.user.role !== 'superadmin') {
                    throw createGraphQLError("Forbidden: Only superadmin can update users", "FORBIDDEN");
                }
                const user = await userService.update(id, input);
                if (!user) throw createGraphQLError(`User with id ${id} not found`, "NOT_FOUND");
                return user;
            } catch (error) {
                throw handleError(error);
            }
        },
        deleteUser: async (_: any, { id }: { id: string }, context: any) => {
            try {
                // Verificar si el usuario es superadmin
                if (context.user.role !== 'superadmin') {
                    throw createGraphQLError("Forbidden: Only superadmin can delete users", "FORBIDDEN");
                }
                const user = await userService.delete(id);
                if (!user) throw createGraphQLError(`User with id ${id} not found`, "NOT_FOUND");
                return user;
            } catch (error) {
                throw handleError(error);
            }
        },

        createComment: async (_: any, { input }: { input: any }, context: any) => {
            try {
                // Asociar el comentario con el usuario autenticado
                input.userId = context.user.id;
                return await commentService.create(input);
            } catch (error) {
                throw handleError(error);
            }
        },
        updateComment: async (_: any, { id, input }: { id: string; input: any }, context: any) => {
            try {
                const comment = await commentService.findById(id);
                if (!comment) throw createGraphQLError(`Comment with id ${id} not found`, "NOT_FOUND");
                if (comment.userId.toString() !== context.user.id) {
                    throw createGraphQLError("Forbidden: You do not have permission to update this comment", "FORBIDDEN");
                }
                return await commentService.update(id, input);
            } catch (error) {
                throw handleError(error);
            }
        },
        deleteComment: async (_: any, { id }: { id: string }, context: any) => {
            try {
                const comment = await commentService.findById(id);
                if (!comment) throw createGraphQLError(`Comment with id ${id} not found`, "NOT_FOUND");
                if (comment.userId.toString() !== context.user.id) {
                    throw createGraphQLError("Forbidden: You do not have permission to delete this comment", "FORBIDDEN");
                }
                return await commentService.delete(id);
            } catch (error) {
                throw handleError(error);
            }
        },

        createReaction: async (_: any, { input }: { input: any }, context: any) => {
            try {
                input.userId = context.user.id; // Asociar reacción al usuario autenticado
                return await reactionService.create(input);
            } catch (error) {
                throw handleError(error);
            }
        },
        deleteReaction: async (_: any, { commentId }: { commentId: string }, context: any) => {
            try {
                const reaction = await reactionService.deleteByUserAndComment(context.user.id, commentId);
                if (!reaction) throw createGraphQLError(`Reaction for comment ${commentId} not found`, "NOT_FOUND");
                return { success: true, message: "Reaction deleted successfully" };
            } catch (error) {
                throw handleError(error);
            }
        },
    },
};

// Helper functions for error handling
function handleError(error: any): GraphQLError {
    if (error.message.includes("not found")) {
        return new GraphQLError(error.message, { extensions: { code: "NOT_FOUND" } });
    } else if (error.message.includes("permission")) {
        return new GraphQLError(error.message, { extensions: { code: "FORBIDDEN" } });
    }
    return new GraphQLError("Internal Server Error", { extensions: { code: "INTERNAL_SERVER_ERROR" } });
}

function createGraphQLError(message: string, code: string): GraphQLError {
    return new GraphQLError(message, { extensions: { code } });
}