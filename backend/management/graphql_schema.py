import graphene

from items.queries import ItemsQuery
from items.mutations import ItemsMutation
from users.queries import UsersQuery


class Query(ItemsQuery, UsersQuery, graphene.ObjectType):
    # This class will inherit from multiple Queries
    # as we begin to add more queries to the project
    pass


class Mutation(ItemsMutation, graphene.ObjectType):
    # This class will inherit from multiple Mutations
    # as we begin to add more mutations to the project
    pass


graphql_schema = graphene.Schema(query=Query, mutation=Mutation)
