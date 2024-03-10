


import { query, action, mutation, internalAction, internalMutation, internalQuery } from "./_generated/server";
import { api, internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import { v } from "convex/values";

export const post = internalMutation({
    args: {
        name: v.string(),
        description: v.string(),
        status: v.string(),
        genre: v.array(v.id("genre")),
        xCoordinate: v.number(),
        yCoordinate: v.number(),
        ticketsNumber: v.number(),
        tickets: v.array(v.id("ticket")),
        users: v.array(v.id("user")),
        comments: v.array(v.id("comment")),
        streamKey: v.string(),
        eventUrl: v.string(),
    },
    handler: async (ctx, args) => {
        try {
            return await ctx.db
                .insert("event", args);
        } catch (e) {
            console.log(e);
            return "failure";
        }
    }
});


export const get = query({
    handler: async (ctx) => {
        try {
            return await ctx.db
                .query("event")
                .collect();
        }
        catch (e) {
            console.log(e);
            return "failure";
        }
    }
});

export const getById = query({
    args: {
        id: v.id("event"),
    },
    handler: async (ctx, args) => {
        try {
            if (!args.id) return "No id provided for event get by id";
            return await ctx.db
                .query("event")
                .filter((q) => q.eq(q.field('_id'), args.id))
                .first();
        } catch (e) {
            console.log(e);
            return "failure";
        }
    }
});


export const getByGenres = query({
    args: {
        genres: v.array(v.id("genre")),
    },
    handler: async (ctx, { genres }) => {
        try {
            if (!genres?.length) return "No genres provided for event get by genres";
            return await ctx.db
                .query("event")
                .filter((q) => q.eq(q.field('genre'), genres))
                .collect();
        } catch (e) {
            console.log(e);
            return "failure";

        }
    }
});

export const deleteByID = internalMutation({
    args: {
        id: v.id("event"),
    },
    handler: async (ctx, { id }) => {
        try {
            if (!id) return "No id provided for event delete";
            return await ctx.db
                .delete(id);
        } catch (e) {
            console.log(e);
            return "failure";
        }

    }
});

export const update = internalMutation({
    args: {
        id: v.id("event"),
        name: v.string(),
        description: v.string(),
        status: v.string(),
        genre: v.array(v.id("genre")),
        xCoordinate: v.number(),
        yCoordinate: v.number(),
        tickets: v.array(v.id("ticket")),
        users: v.array(v.id("user")),
        comments: v.array(v.id("comment")),
        streamKey: v.string(),
        eventUrl: v.string(),
    },

    handler: async (ctx, args) => {
        try {
            if (!args.id) return "No id provided for event update";
            return await ctx.db.replace(args.id, args);
        } catch (e) {
            console.log(e);
            return "failure";
        }
    }
});

export const patch = internalMutation({
    args: {
        id: v.id("event"),
        name: v.optional(v.string()),
        description: v.optional(v.string()),
        status: v.optional(v.string()),
        genre: v.optional(v.array(v.id("genre"))),
        xCoordinate: v.optional(v.number()),
        yCoordinate: v.optional(v.number()),
        tickets: v.optional(v.array(v.id("ticket"))),
        users: v.optional(v.array(v.id("user"))),
        comments: v.optional(v.array(v.id("comment"))),
        eventUrl: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        try {
            if (!args.id) return "No id provided for event update";
            return await ctx.db.patch(args.id, args);
        } catch (e) {
            console.log(e);
            return "failure";
        }
    }
});