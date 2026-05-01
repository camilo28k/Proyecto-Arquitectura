
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Health
 * 
 */
export type Health = $Result.DefaultSelection<Prisma.$HealthPayload>
/**
 * Model Education
 * 
 */
export type Education = $Result.DefaultSelection<Prisma.$EducationPayload>
/**
 * Model Technology
 * 
 */
export type Technology = $Result.DefaultSelection<Prisma.$TechnologyPayload>
/**
 * Model Art
 * 
 */
export type Art = $Result.DefaultSelection<Prisma.$ArtPayload>
/**
 * Model Entrepreneurship
 * 
 */
export type Entrepreneurship = $Result.DefaultSelection<Prisma.$EntrepreneurshipPayload>
/**
 * Model Activity
 * 
 */
export type Activity = $Result.DefaultSelection<Prisma.$ActivityPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Health
 * const health = await prisma.health.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Health
   * const health = await prisma.health.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.health`: Exposes CRUD operations for the **Health** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Health
    * const health = await prisma.health.findMany()
    * ```
    */
  get health(): Prisma.HealthDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.education`: Exposes CRUD operations for the **Education** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Educations
    * const educations = await prisma.education.findMany()
    * ```
    */
  get education(): Prisma.EducationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.technology`: Exposes CRUD operations for the **Technology** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Technologies
    * const technologies = await prisma.technology.findMany()
    * ```
    */
  get technology(): Prisma.TechnologyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.art`: Exposes CRUD operations for the **Art** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Arts
    * const arts = await prisma.art.findMany()
    * ```
    */
  get art(): Prisma.ArtDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.entrepreneurship`: Exposes CRUD operations for the **Entrepreneurship** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Entrepreneurships
    * const entrepreneurships = await prisma.entrepreneurship.findMany()
    * ```
    */
  get entrepreneurship(): Prisma.EntrepreneurshipDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.activity`: Exposes CRUD operations for the **Activity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Activities
    * const activities = await prisma.activity.findMany()
    * ```
    */
  get activity(): Prisma.ActivityDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Health: 'Health',
    Education: 'Education',
    Technology: 'Technology',
    Art: 'Art',
    Entrepreneurship: 'Entrepreneurship',
    Activity: 'Activity'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "health" | "education" | "technology" | "art" | "entrepreneurship" | "activity"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Health: {
        payload: Prisma.$HealthPayload<ExtArgs>
        fields: Prisma.HealthFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HealthFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HealthFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthPayload>
          }
          findFirst: {
            args: Prisma.HealthFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HealthFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthPayload>
          }
          findMany: {
            args: Prisma.HealthFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthPayload>[]
          }
          create: {
            args: Prisma.HealthCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthPayload>
          }
          createMany: {
            args: Prisma.HealthCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HealthCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthPayload>[]
          }
          delete: {
            args: Prisma.HealthDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthPayload>
          }
          update: {
            args: Prisma.HealthUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthPayload>
          }
          deleteMany: {
            args: Prisma.HealthDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HealthUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HealthUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthPayload>[]
          }
          upsert: {
            args: Prisma.HealthUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthPayload>
          }
          aggregate: {
            args: Prisma.HealthAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHealth>
          }
          groupBy: {
            args: Prisma.HealthGroupByArgs<ExtArgs>
            result: $Utils.Optional<HealthGroupByOutputType>[]
          }
          count: {
            args: Prisma.HealthCountArgs<ExtArgs>
            result: $Utils.Optional<HealthCountAggregateOutputType> | number
          }
        }
      }
      Education: {
        payload: Prisma.$EducationPayload<ExtArgs>
        fields: Prisma.EducationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EducationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EducationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationPayload>
          }
          findFirst: {
            args: Prisma.EducationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EducationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationPayload>
          }
          findMany: {
            args: Prisma.EducationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationPayload>[]
          }
          create: {
            args: Prisma.EducationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationPayload>
          }
          createMany: {
            args: Prisma.EducationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EducationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationPayload>[]
          }
          delete: {
            args: Prisma.EducationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationPayload>
          }
          update: {
            args: Prisma.EducationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationPayload>
          }
          deleteMany: {
            args: Prisma.EducationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EducationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EducationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationPayload>[]
          }
          upsert: {
            args: Prisma.EducationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationPayload>
          }
          aggregate: {
            args: Prisma.EducationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEducation>
          }
          groupBy: {
            args: Prisma.EducationGroupByArgs<ExtArgs>
            result: $Utils.Optional<EducationGroupByOutputType>[]
          }
          count: {
            args: Prisma.EducationCountArgs<ExtArgs>
            result: $Utils.Optional<EducationCountAggregateOutputType> | number
          }
        }
      }
      Technology: {
        payload: Prisma.$TechnologyPayload<ExtArgs>
        fields: Prisma.TechnologyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TechnologyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TechnologyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TechnologyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TechnologyPayload>
          }
          findFirst: {
            args: Prisma.TechnologyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TechnologyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TechnologyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TechnologyPayload>
          }
          findMany: {
            args: Prisma.TechnologyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TechnologyPayload>[]
          }
          create: {
            args: Prisma.TechnologyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TechnologyPayload>
          }
          createMany: {
            args: Prisma.TechnologyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TechnologyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TechnologyPayload>[]
          }
          delete: {
            args: Prisma.TechnologyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TechnologyPayload>
          }
          update: {
            args: Prisma.TechnologyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TechnologyPayload>
          }
          deleteMany: {
            args: Prisma.TechnologyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TechnologyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TechnologyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TechnologyPayload>[]
          }
          upsert: {
            args: Prisma.TechnologyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TechnologyPayload>
          }
          aggregate: {
            args: Prisma.TechnologyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTechnology>
          }
          groupBy: {
            args: Prisma.TechnologyGroupByArgs<ExtArgs>
            result: $Utils.Optional<TechnologyGroupByOutputType>[]
          }
          count: {
            args: Prisma.TechnologyCountArgs<ExtArgs>
            result: $Utils.Optional<TechnologyCountAggregateOutputType> | number
          }
        }
      }
      Art: {
        payload: Prisma.$ArtPayload<ExtArgs>
        fields: Prisma.ArtFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ArtFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ArtFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtPayload>
          }
          findFirst: {
            args: Prisma.ArtFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ArtFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtPayload>
          }
          findMany: {
            args: Prisma.ArtFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtPayload>[]
          }
          create: {
            args: Prisma.ArtCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtPayload>
          }
          createMany: {
            args: Prisma.ArtCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ArtCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtPayload>[]
          }
          delete: {
            args: Prisma.ArtDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtPayload>
          }
          update: {
            args: Prisma.ArtUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtPayload>
          }
          deleteMany: {
            args: Prisma.ArtDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ArtUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ArtUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtPayload>[]
          }
          upsert: {
            args: Prisma.ArtUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtPayload>
          }
          aggregate: {
            args: Prisma.ArtAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateArt>
          }
          groupBy: {
            args: Prisma.ArtGroupByArgs<ExtArgs>
            result: $Utils.Optional<ArtGroupByOutputType>[]
          }
          count: {
            args: Prisma.ArtCountArgs<ExtArgs>
            result: $Utils.Optional<ArtCountAggregateOutputType> | number
          }
        }
      }
      Entrepreneurship: {
        payload: Prisma.$EntrepreneurshipPayload<ExtArgs>
        fields: Prisma.EntrepreneurshipFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EntrepreneurshipFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntrepreneurshipPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EntrepreneurshipFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntrepreneurshipPayload>
          }
          findFirst: {
            args: Prisma.EntrepreneurshipFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntrepreneurshipPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EntrepreneurshipFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntrepreneurshipPayload>
          }
          findMany: {
            args: Prisma.EntrepreneurshipFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntrepreneurshipPayload>[]
          }
          create: {
            args: Prisma.EntrepreneurshipCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntrepreneurshipPayload>
          }
          createMany: {
            args: Prisma.EntrepreneurshipCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EntrepreneurshipCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntrepreneurshipPayload>[]
          }
          delete: {
            args: Prisma.EntrepreneurshipDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntrepreneurshipPayload>
          }
          update: {
            args: Prisma.EntrepreneurshipUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntrepreneurshipPayload>
          }
          deleteMany: {
            args: Prisma.EntrepreneurshipDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EntrepreneurshipUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EntrepreneurshipUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntrepreneurshipPayload>[]
          }
          upsert: {
            args: Prisma.EntrepreneurshipUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntrepreneurshipPayload>
          }
          aggregate: {
            args: Prisma.EntrepreneurshipAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEntrepreneurship>
          }
          groupBy: {
            args: Prisma.EntrepreneurshipGroupByArgs<ExtArgs>
            result: $Utils.Optional<EntrepreneurshipGroupByOutputType>[]
          }
          count: {
            args: Prisma.EntrepreneurshipCountArgs<ExtArgs>
            result: $Utils.Optional<EntrepreneurshipCountAggregateOutputType> | number
          }
        }
      }
      Activity: {
        payload: Prisma.$ActivityPayload<ExtArgs>
        fields: Prisma.ActivityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActivityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActivityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          findFirst: {
            args: Prisma.ActivityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActivityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          findMany: {
            args: Prisma.ActivityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>[]
          }
          create: {
            args: Prisma.ActivityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          createMany: {
            args: Prisma.ActivityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActivityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>[]
          }
          delete: {
            args: Prisma.ActivityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          update: {
            args: Prisma.ActivityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          deleteMany: {
            args: Prisma.ActivityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActivityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ActivityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>[]
          }
          upsert: {
            args: Prisma.ActivityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          aggregate: {
            args: Prisma.ActivityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActivity>
          }
          groupBy: {
            args: Prisma.ActivityGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActivityGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActivityCountArgs<ExtArgs>
            result: $Utils.Optional<ActivityCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    health?: HealthOmit
    education?: EducationOmit
    technology?: TechnologyOmit
    art?: ArtOmit
    entrepreneurship?: EntrepreneurshipOmit
    activity?: ActivityOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model Health
   */

  export type AggregateHealth = {
    _count: HealthCountAggregateOutputType | null
    _avg: HealthAvgAggregateOutputType | null
    _sum: HealthSumAggregateOutputType | null
    _min: HealthMinAggregateOutputType | null
    _max: HealthMaxAggregateOutputType | null
  }

  export type HealthAvgAggregateOutputType = {
    goal: number | null
    raised: number | null
  }

  export type HealthSumAggregateOutputType = {
    goal: number | null
    raised: number | null
  }

  export type HealthMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    goal: number | null
    raised: number | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HealthMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    goal: number | null
    raised: number | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HealthCountAggregateOutputType = {
    id: number
    title: number
    description: number
    goal: number
    raised: number
    image: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type HealthAvgAggregateInputType = {
    goal?: true
    raised?: true
  }

  export type HealthSumAggregateInputType = {
    goal?: true
    raised?: true
  }

  export type HealthMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    goal?: true
    raised?: true
    image?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HealthMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    goal?: true
    raised?: true
    image?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HealthCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    goal?: true
    raised?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type HealthAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Health to aggregate.
     */
    where?: HealthWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Health to fetch.
     */
    orderBy?: HealthOrderByWithRelationInput | HealthOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HealthWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Health from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Health.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Health
    **/
    _count?: true | HealthCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HealthAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HealthSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HealthMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HealthMaxAggregateInputType
  }

  export type GetHealthAggregateType<T extends HealthAggregateArgs> = {
        [P in keyof T & keyof AggregateHealth]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHealth[P]>
      : GetScalarType<T[P], AggregateHealth[P]>
  }




  export type HealthGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HealthWhereInput
    orderBy?: HealthOrderByWithAggregationInput | HealthOrderByWithAggregationInput[]
    by: HealthScalarFieldEnum[] | HealthScalarFieldEnum
    having?: HealthScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HealthCountAggregateInputType | true
    _avg?: HealthAvgAggregateInputType
    _sum?: HealthSumAggregateInputType
    _min?: HealthMinAggregateInputType
    _max?: HealthMaxAggregateInputType
  }

  export type HealthGroupByOutputType = {
    id: string
    title: string
    description: string
    goal: number
    raised: number
    image: string | null
    createdAt: Date
    updatedAt: Date
    _count: HealthCountAggregateOutputType | null
    _avg: HealthAvgAggregateOutputType | null
    _sum: HealthSumAggregateOutputType | null
    _min: HealthMinAggregateOutputType | null
    _max: HealthMaxAggregateOutputType | null
  }

  type GetHealthGroupByPayload<T extends HealthGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HealthGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HealthGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HealthGroupByOutputType[P]>
            : GetScalarType<T[P], HealthGroupByOutputType[P]>
        }
      >
    >


  export type HealthSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    goal?: boolean
    raised?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["health"]>

  export type HealthSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    goal?: boolean
    raised?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["health"]>

  export type HealthSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    goal?: boolean
    raised?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["health"]>

  export type HealthSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    goal?: boolean
    raised?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type HealthOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "goal" | "raised" | "image" | "createdAt" | "updatedAt", ExtArgs["result"]["health"]>

  export type $HealthPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Health"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string
      goal: number
      raised: number
      image: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["health"]>
    composites: {}
  }

  type HealthGetPayload<S extends boolean | null | undefined | HealthDefaultArgs> = $Result.GetResult<Prisma.$HealthPayload, S>

  type HealthCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HealthFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HealthCountAggregateInputType | true
    }

  export interface HealthDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Health'], meta: { name: 'Health' } }
    /**
     * Find zero or one Health that matches the filter.
     * @param {HealthFindUniqueArgs} args - Arguments to find a Health
     * @example
     * // Get one Health
     * const health = await prisma.health.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HealthFindUniqueArgs>(args: SelectSubset<T, HealthFindUniqueArgs<ExtArgs>>): Prisma__HealthClient<$Result.GetResult<Prisma.$HealthPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Health that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HealthFindUniqueOrThrowArgs} args - Arguments to find a Health
     * @example
     * // Get one Health
     * const health = await prisma.health.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HealthFindUniqueOrThrowArgs>(args: SelectSubset<T, HealthFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HealthClient<$Result.GetResult<Prisma.$HealthPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Health that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthFindFirstArgs} args - Arguments to find a Health
     * @example
     * // Get one Health
     * const health = await prisma.health.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HealthFindFirstArgs>(args?: SelectSubset<T, HealthFindFirstArgs<ExtArgs>>): Prisma__HealthClient<$Result.GetResult<Prisma.$HealthPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Health that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthFindFirstOrThrowArgs} args - Arguments to find a Health
     * @example
     * // Get one Health
     * const health = await prisma.health.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HealthFindFirstOrThrowArgs>(args?: SelectSubset<T, HealthFindFirstOrThrowArgs<ExtArgs>>): Prisma__HealthClient<$Result.GetResult<Prisma.$HealthPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Health that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Health
     * const health = await prisma.health.findMany()
     * 
     * // Get first 10 Health
     * const health = await prisma.health.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const healthWithIdOnly = await prisma.health.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HealthFindManyArgs>(args?: SelectSubset<T, HealthFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HealthPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Health.
     * @param {HealthCreateArgs} args - Arguments to create a Health.
     * @example
     * // Create one Health
     * const Health = await prisma.health.create({
     *   data: {
     *     // ... data to create a Health
     *   }
     * })
     * 
     */
    create<T extends HealthCreateArgs>(args: SelectSubset<T, HealthCreateArgs<ExtArgs>>): Prisma__HealthClient<$Result.GetResult<Prisma.$HealthPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Health.
     * @param {HealthCreateManyArgs} args - Arguments to create many Health.
     * @example
     * // Create many Health
     * const health = await prisma.health.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HealthCreateManyArgs>(args?: SelectSubset<T, HealthCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Health and returns the data saved in the database.
     * @param {HealthCreateManyAndReturnArgs} args - Arguments to create many Health.
     * @example
     * // Create many Health
     * const health = await prisma.health.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Health and only return the `id`
     * const healthWithIdOnly = await prisma.health.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HealthCreateManyAndReturnArgs>(args?: SelectSubset<T, HealthCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HealthPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Health.
     * @param {HealthDeleteArgs} args - Arguments to delete one Health.
     * @example
     * // Delete one Health
     * const Health = await prisma.health.delete({
     *   where: {
     *     // ... filter to delete one Health
     *   }
     * })
     * 
     */
    delete<T extends HealthDeleteArgs>(args: SelectSubset<T, HealthDeleteArgs<ExtArgs>>): Prisma__HealthClient<$Result.GetResult<Prisma.$HealthPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Health.
     * @param {HealthUpdateArgs} args - Arguments to update one Health.
     * @example
     * // Update one Health
     * const health = await prisma.health.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HealthUpdateArgs>(args: SelectSubset<T, HealthUpdateArgs<ExtArgs>>): Prisma__HealthClient<$Result.GetResult<Prisma.$HealthPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Health.
     * @param {HealthDeleteManyArgs} args - Arguments to filter Health to delete.
     * @example
     * // Delete a few Health
     * const { count } = await prisma.health.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HealthDeleteManyArgs>(args?: SelectSubset<T, HealthDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Health.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Health
     * const health = await prisma.health.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HealthUpdateManyArgs>(args: SelectSubset<T, HealthUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Health and returns the data updated in the database.
     * @param {HealthUpdateManyAndReturnArgs} args - Arguments to update many Health.
     * @example
     * // Update many Health
     * const health = await prisma.health.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Health and only return the `id`
     * const healthWithIdOnly = await prisma.health.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HealthUpdateManyAndReturnArgs>(args: SelectSubset<T, HealthUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HealthPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Health.
     * @param {HealthUpsertArgs} args - Arguments to update or create a Health.
     * @example
     * // Update or create a Health
     * const health = await prisma.health.upsert({
     *   create: {
     *     // ... data to create a Health
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Health we want to update
     *   }
     * })
     */
    upsert<T extends HealthUpsertArgs>(args: SelectSubset<T, HealthUpsertArgs<ExtArgs>>): Prisma__HealthClient<$Result.GetResult<Prisma.$HealthPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Health.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthCountArgs} args - Arguments to filter Health to count.
     * @example
     * // Count the number of Health
     * const count = await prisma.health.count({
     *   where: {
     *     // ... the filter for the Health we want to count
     *   }
     * })
    **/
    count<T extends HealthCountArgs>(
      args?: Subset<T, HealthCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HealthCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Health.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HealthAggregateArgs>(args: Subset<T, HealthAggregateArgs>): Prisma.PrismaPromise<GetHealthAggregateType<T>>

    /**
     * Group by Health.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HealthGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HealthGroupByArgs['orderBy'] }
        : { orderBy?: HealthGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HealthGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHealthGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Health model
   */
  readonly fields: HealthFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Health.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HealthClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Health model
   */
  interface HealthFieldRefs {
    readonly id: FieldRef<"Health", 'String'>
    readonly title: FieldRef<"Health", 'String'>
    readonly description: FieldRef<"Health", 'String'>
    readonly goal: FieldRef<"Health", 'Float'>
    readonly raised: FieldRef<"Health", 'Float'>
    readonly image: FieldRef<"Health", 'String'>
    readonly createdAt: FieldRef<"Health", 'DateTime'>
    readonly updatedAt: FieldRef<"Health", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Health findUnique
   */
  export type HealthFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Health
     */
    select?: HealthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Health
     */
    omit?: HealthOmit<ExtArgs> | null
    /**
     * Filter, which Health to fetch.
     */
    where: HealthWhereUniqueInput
  }

  /**
   * Health findUniqueOrThrow
   */
  export type HealthFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Health
     */
    select?: HealthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Health
     */
    omit?: HealthOmit<ExtArgs> | null
    /**
     * Filter, which Health to fetch.
     */
    where: HealthWhereUniqueInput
  }

  /**
   * Health findFirst
   */
  export type HealthFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Health
     */
    select?: HealthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Health
     */
    omit?: HealthOmit<ExtArgs> | null
    /**
     * Filter, which Health to fetch.
     */
    where?: HealthWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Health to fetch.
     */
    orderBy?: HealthOrderByWithRelationInput | HealthOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Health.
     */
    cursor?: HealthWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Health from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Health.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Health.
     */
    distinct?: HealthScalarFieldEnum | HealthScalarFieldEnum[]
  }

  /**
   * Health findFirstOrThrow
   */
  export type HealthFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Health
     */
    select?: HealthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Health
     */
    omit?: HealthOmit<ExtArgs> | null
    /**
     * Filter, which Health to fetch.
     */
    where?: HealthWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Health to fetch.
     */
    orderBy?: HealthOrderByWithRelationInput | HealthOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Health.
     */
    cursor?: HealthWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Health from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Health.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Health.
     */
    distinct?: HealthScalarFieldEnum | HealthScalarFieldEnum[]
  }

  /**
   * Health findMany
   */
  export type HealthFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Health
     */
    select?: HealthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Health
     */
    omit?: HealthOmit<ExtArgs> | null
    /**
     * Filter, which Health to fetch.
     */
    where?: HealthWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Health to fetch.
     */
    orderBy?: HealthOrderByWithRelationInput | HealthOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Health.
     */
    cursor?: HealthWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Health from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Health.
     */
    skip?: number
    distinct?: HealthScalarFieldEnum | HealthScalarFieldEnum[]
  }

  /**
   * Health create
   */
  export type HealthCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Health
     */
    select?: HealthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Health
     */
    omit?: HealthOmit<ExtArgs> | null
    /**
     * The data needed to create a Health.
     */
    data: XOR<HealthCreateInput, HealthUncheckedCreateInput>
  }

  /**
   * Health createMany
   */
  export type HealthCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Health.
     */
    data: HealthCreateManyInput | HealthCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Health createManyAndReturn
   */
  export type HealthCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Health
     */
    select?: HealthSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Health
     */
    omit?: HealthOmit<ExtArgs> | null
    /**
     * The data used to create many Health.
     */
    data: HealthCreateManyInput | HealthCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Health update
   */
  export type HealthUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Health
     */
    select?: HealthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Health
     */
    omit?: HealthOmit<ExtArgs> | null
    /**
     * The data needed to update a Health.
     */
    data: XOR<HealthUpdateInput, HealthUncheckedUpdateInput>
    /**
     * Choose, which Health to update.
     */
    where: HealthWhereUniqueInput
  }

  /**
   * Health updateMany
   */
  export type HealthUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Health.
     */
    data: XOR<HealthUpdateManyMutationInput, HealthUncheckedUpdateManyInput>
    /**
     * Filter which Health to update
     */
    where?: HealthWhereInput
    /**
     * Limit how many Health to update.
     */
    limit?: number
  }

  /**
   * Health updateManyAndReturn
   */
  export type HealthUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Health
     */
    select?: HealthSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Health
     */
    omit?: HealthOmit<ExtArgs> | null
    /**
     * The data used to update Health.
     */
    data: XOR<HealthUpdateManyMutationInput, HealthUncheckedUpdateManyInput>
    /**
     * Filter which Health to update
     */
    where?: HealthWhereInput
    /**
     * Limit how many Health to update.
     */
    limit?: number
  }

  /**
   * Health upsert
   */
  export type HealthUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Health
     */
    select?: HealthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Health
     */
    omit?: HealthOmit<ExtArgs> | null
    /**
     * The filter to search for the Health to update in case it exists.
     */
    where: HealthWhereUniqueInput
    /**
     * In case the Health found by the `where` argument doesn't exist, create a new Health with this data.
     */
    create: XOR<HealthCreateInput, HealthUncheckedCreateInput>
    /**
     * In case the Health was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HealthUpdateInput, HealthUncheckedUpdateInput>
  }

  /**
   * Health delete
   */
  export type HealthDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Health
     */
    select?: HealthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Health
     */
    omit?: HealthOmit<ExtArgs> | null
    /**
     * Filter which Health to delete.
     */
    where: HealthWhereUniqueInput
  }

  /**
   * Health deleteMany
   */
  export type HealthDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Health to delete
     */
    where?: HealthWhereInput
    /**
     * Limit how many Health to delete.
     */
    limit?: number
  }

  /**
   * Health without action
   */
  export type HealthDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Health
     */
    select?: HealthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Health
     */
    omit?: HealthOmit<ExtArgs> | null
  }


  /**
   * Model Education
   */

  export type AggregateEducation = {
    _count: EducationCountAggregateOutputType | null
    _avg: EducationAvgAggregateOutputType | null
    _sum: EducationSumAggregateOutputType | null
    _min: EducationMinAggregateOutputType | null
    _max: EducationMaxAggregateOutputType | null
  }

  export type EducationAvgAggregateOutputType = {
    goal: number | null
    raised: number | null
  }

  export type EducationSumAggregateOutputType = {
    goal: number | null
    raised: number | null
  }

  export type EducationMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    goal: number | null
    raised: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EducationMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    goal: number | null
    raised: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EducationCountAggregateOutputType = {
    id: number
    title: number
    description: number
    goal: number
    raised: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EducationAvgAggregateInputType = {
    goal?: true
    raised?: true
  }

  export type EducationSumAggregateInputType = {
    goal?: true
    raised?: true
  }

  export type EducationMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    goal?: true
    raised?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EducationMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    goal?: true
    raised?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EducationCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    goal?: true
    raised?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EducationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Education to aggregate.
     */
    where?: EducationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Educations to fetch.
     */
    orderBy?: EducationOrderByWithRelationInput | EducationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EducationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Educations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Educations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Educations
    **/
    _count?: true | EducationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EducationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EducationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EducationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EducationMaxAggregateInputType
  }

  export type GetEducationAggregateType<T extends EducationAggregateArgs> = {
        [P in keyof T & keyof AggregateEducation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEducation[P]>
      : GetScalarType<T[P], AggregateEducation[P]>
  }




  export type EducationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EducationWhereInput
    orderBy?: EducationOrderByWithAggregationInput | EducationOrderByWithAggregationInput[]
    by: EducationScalarFieldEnum[] | EducationScalarFieldEnum
    having?: EducationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EducationCountAggregateInputType | true
    _avg?: EducationAvgAggregateInputType
    _sum?: EducationSumAggregateInputType
    _min?: EducationMinAggregateInputType
    _max?: EducationMaxAggregateInputType
  }

  export type EducationGroupByOutputType = {
    id: string
    title: string
    description: string
    goal: number
    raised: number
    createdAt: Date
    updatedAt: Date
    _count: EducationCountAggregateOutputType | null
    _avg: EducationAvgAggregateOutputType | null
    _sum: EducationSumAggregateOutputType | null
    _min: EducationMinAggregateOutputType | null
    _max: EducationMaxAggregateOutputType | null
  }

  type GetEducationGroupByPayload<T extends EducationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EducationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EducationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EducationGroupByOutputType[P]>
            : GetScalarType<T[P], EducationGroupByOutputType[P]>
        }
      >
    >


  export type EducationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    goal?: boolean
    raised?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["education"]>

  export type EducationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    goal?: boolean
    raised?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["education"]>

  export type EducationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    goal?: boolean
    raised?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["education"]>

  export type EducationSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    goal?: boolean
    raised?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EducationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "goal" | "raised" | "createdAt" | "updatedAt", ExtArgs["result"]["education"]>

  export type $EducationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Education"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string
      goal: number
      raised: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["education"]>
    composites: {}
  }

  type EducationGetPayload<S extends boolean | null | undefined | EducationDefaultArgs> = $Result.GetResult<Prisma.$EducationPayload, S>

  type EducationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EducationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EducationCountAggregateInputType | true
    }

  export interface EducationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Education'], meta: { name: 'Education' } }
    /**
     * Find zero or one Education that matches the filter.
     * @param {EducationFindUniqueArgs} args - Arguments to find a Education
     * @example
     * // Get one Education
     * const education = await prisma.education.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EducationFindUniqueArgs>(args: SelectSubset<T, EducationFindUniqueArgs<ExtArgs>>): Prisma__EducationClient<$Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Education that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EducationFindUniqueOrThrowArgs} args - Arguments to find a Education
     * @example
     * // Get one Education
     * const education = await prisma.education.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EducationFindUniqueOrThrowArgs>(args: SelectSubset<T, EducationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EducationClient<$Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Education that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducationFindFirstArgs} args - Arguments to find a Education
     * @example
     * // Get one Education
     * const education = await prisma.education.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EducationFindFirstArgs>(args?: SelectSubset<T, EducationFindFirstArgs<ExtArgs>>): Prisma__EducationClient<$Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Education that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducationFindFirstOrThrowArgs} args - Arguments to find a Education
     * @example
     * // Get one Education
     * const education = await prisma.education.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EducationFindFirstOrThrowArgs>(args?: SelectSubset<T, EducationFindFirstOrThrowArgs<ExtArgs>>): Prisma__EducationClient<$Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Educations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Educations
     * const educations = await prisma.education.findMany()
     * 
     * // Get first 10 Educations
     * const educations = await prisma.education.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const educationWithIdOnly = await prisma.education.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EducationFindManyArgs>(args?: SelectSubset<T, EducationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Education.
     * @param {EducationCreateArgs} args - Arguments to create a Education.
     * @example
     * // Create one Education
     * const Education = await prisma.education.create({
     *   data: {
     *     // ... data to create a Education
     *   }
     * })
     * 
     */
    create<T extends EducationCreateArgs>(args: SelectSubset<T, EducationCreateArgs<ExtArgs>>): Prisma__EducationClient<$Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Educations.
     * @param {EducationCreateManyArgs} args - Arguments to create many Educations.
     * @example
     * // Create many Educations
     * const education = await prisma.education.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EducationCreateManyArgs>(args?: SelectSubset<T, EducationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Educations and returns the data saved in the database.
     * @param {EducationCreateManyAndReturnArgs} args - Arguments to create many Educations.
     * @example
     * // Create many Educations
     * const education = await prisma.education.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Educations and only return the `id`
     * const educationWithIdOnly = await prisma.education.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EducationCreateManyAndReturnArgs>(args?: SelectSubset<T, EducationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Education.
     * @param {EducationDeleteArgs} args - Arguments to delete one Education.
     * @example
     * // Delete one Education
     * const Education = await prisma.education.delete({
     *   where: {
     *     // ... filter to delete one Education
     *   }
     * })
     * 
     */
    delete<T extends EducationDeleteArgs>(args: SelectSubset<T, EducationDeleteArgs<ExtArgs>>): Prisma__EducationClient<$Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Education.
     * @param {EducationUpdateArgs} args - Arguments to update one Education.
     * @example
     * // Update one Education
     * const education = await prisma.education.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EducationUpdateArgs>(args: SelectSubset<T, EducationUpdateArgs<ExtArgs>>): Prisma__EducationClient<$Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Educations.
     * @param {EducationDeleteManyArgs} args - Arguments to filter Educations to delete.
     * @example
     * // Delete a few Educations
     * const { count } = await prisma.education.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EducationDeleteManyArgs>(args?: SelectSubset<T, EducationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Educations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Educations
     * const education = await prisma.education.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EducationUpdateManyArgs>(args: SelectSubset<T, EducationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Educations and returns the data updated in the database.
     * @param {EducationUpdateManyAndReturnArgs} args - Arguments to update many Educations.
     * @example
     * // Update many Educations
     * const education = await prisma.education.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Educations and only return the `id`
     * const educationWithIdOnly = await prisma.education.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EducationUpdateManyAndReturnArgs>(args: SelectSubset<T, EducationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Education.
     * @param {EducationUpsertArgs} args - Arguments to update or create a Education.
     * @example
     * // Update or create a Education
     * const education = await prisma.education.upsert({
     *   create: {
     *     // ... data to create a Education
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Education we want to update
     *   }
     * })
     */
    upsert<T extends EducationUpsertArgs>(args: SelectSubset<T, EducationUpsertArgs<ExtArgs>>): Prisma__EducationClient<$Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Educations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducationCountArgs} args - Arguments to filter Educations to count.
     * @example
     * // Count the number of Educations
     * const count = await prisma.education.count({
     *   where: {
     *     // ... the filter for the Educations we want to count
     *   }
     * })
    **/
    count<T extends EducationCountArgs>(
      args?: Subset<T, EducationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EducationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Education.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EducationAggregateArgs>(args: Subset<T, EducationAggregateArgs>): Prisma.PrismaPromise<GetEducationAggregateType<T>>

    /**
     * Group by Education.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EducationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EducationGroupByArgs['orderBy'] }
        : { orderBy?: EducationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EducationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEducationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Education model
   */
  readonly fields: EducationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Education.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EducationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Education model
   */
  interface EducationFieldRefs {
    readonly id: FieldRef<"Education", 'String'>
    readonly title: FieldRef<"Education", 'String'>
    readonly description: FieldRef<"Education", 'String'>
    readonly goal: FieldRef<"Education", 'Float'>
    readonly raised: FieldRef<"Education", 'Float'>
    readonly createdAt: FieldRef<"Education", 'DateTime'>
    readonly updatedAt: FieldRef<"Education", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Education findUnique
   */
  export type EducationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * Filter, which Education to fetch.
     */
    where: EducationWhereUniqueInput
  }

  /**
   * Education findUniqueOrThrow
   */
  export type EducationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * Filter, which Education to fetch.
     */
    where: EducationWhereUniqueInput
  }

  /**
   * Education findFirst
   */
  export type EducationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * Filter, which Education to fetch.
     */
    where?: EducationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Educations to fetch.
     */
    orderBy?: EducationOrderByWithRelationInput | EducationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Educations.
     */
    cursor?: EducationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Educations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Educations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Educations.
     */
    distinct?: EducationScalarFieldEnum | EducationScalarFieldEnum[]
  }

  /**
   * Education findFirstOrThrow
   */
  export type EducationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * Filter, which Education to fetch.
     */
    where?: EducationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Educations to fetch.
     */
    orderBy?: EducationOrderByWithRelationInput | EducationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Educations.
     */
    cursor?: EducationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Educations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Educations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Educations.
     */
    distinct?: EducationScalarFieldEnum | EducationScalarFieldEnum[]
  }

  /**
   * Education findMany
   */
  export type EducationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * Filter, which Educations to fetch.
     */
    where?: EducationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Educations to fetch.
     */
    orderBy?: EducationOrderByWithRelationInput | EducationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Educations.
     */
    cursor?: EducationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Educations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Educations.
     */
    skip?: number
    distinct?: EducationScalarFieldEnum | EducationScalarFieldEnum[]
  }

  /**
   * Education create
   */
  export type EducationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * The data needed to create a Education.
     */
    data: XOR<EducationCreateInput, EducationUncheckedCreateInput>
  }

  /**
   * Education createMany
   */
  export type EducationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Educations.
     */
    data: EducationCreateManyInput | EducationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Education createManyAndReturn
   */
  export type EducationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * The data used to create many Educations.
     */
    data: EducationCreateManyInput | EducationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Education update
   */
  export type EducationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * The data needed to update a Education.
     */
    data: XOR<EducationUpdateInput, EducationUncheckedUpdateInput>
    /**
     * Choose, which Education to update.
     */
    where: EducationWhereUniqueInput
  }

  /**
   * Education updateMany
   */
  export type EducationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Educations.
     */
    data: XOR<EducationUpdateManyMutationInput, EducationUncheckedUpdateManyInput>
    /**
     * Filter which Educations to update
     */
    where?: EducationWhereInput
    /**
     * Limit how many Educations to update.
     */
    limit?: number
  }

  /**
   * Education updateManyAndReturn
   */
  export type EducationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * The data used to update Educations.
     */
    data: XOR<EducationUpdateManyMutationInput, EducationUncheckedUpdateManyInput>
    /**
     * Filter which Educations to update
     */
    where?: EducationWhereInput
    /**
     * Limit how many Educations to update.
     */
    limit?: number
  }

  /**
   * Education upsert
   */
  export type EducationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * The filter to search for the Education to update in case it exists.
     */
    where: EducationWhereUniqueInput
    /**
     * In case the Education found by the `where` argument doesn't exist, create a new Education with this data.
     */
    create: XOR<EducationCreateInput, EducationUncheckedCreateInput>
    /**
     * In case the Education was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EducationUpdateInput, EducationUncheckedUpdateInput>
  }

  /**
   * Education delete
   */
  export type EducationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
    /**
     * Filter which Education to delete.
     */
    where: EducationWhereUniqueInput
  }

  /**
   * Education deleteMany
   */
  export type EducationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Educations to delete
     */
    where?: EducationWhereInput
    /**
     * Limit how many Educations to delete.
     */
    limit?: number
  }

  /**
   * Education without action
   */
  export type EducationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null
  }


  /**
   * Model Technology
   */

  export type AggregateTechnology = {
    _count: TechnologyCountAggregateOutputType | null
    _avg: TechnologyAvgAggregateOutputType | null
    _sum: TechnologySumAggregateOutputType | null
    _min: TechnologyMinAggregateOutputType | null
    _max: TechnologyMaxAggregateOutputType | null
  }

  export type TechnologyAvgAggregateOutputType = {
    goal: number | null
    raised: number | null
  }

  export type TechnologySumAggregateOutputType = {
    goal: number | null
    raised: number | null
  }

  export type TechnologyMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    goal: number | null
    raised: number | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TechnologyMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    goal: number | null
    raised: number | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TechnologyCountAggregateOutputType = {
    id: number
    title: number
    description: number
    goal: number
    raised: number
    image: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TechnologyAvgAggregateInputType = {
    goal?: true
    raised?: true
  }

  export type TechnologySumAggregateInputType = {
    goal?: true
    raised?: true
  }

  export type TechnologyMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    goal?: true
    raised?: true
    image?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TechnologyMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    goal?: true
    raised?: true
    image?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TechnologyCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    goal?: true
    raised?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TechnologyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Technology to aggregate.
     */
    where?: TechnologyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Technologies to fetch.
     */
    orderBy?: TechnologyOrderByWithRelationInput | TechnologyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TechnologyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Technologies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Technologies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Technologies
    **/
    _count?: true | TechnologyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TechnologyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TechnologySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TechnologyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TechnologyMaxAggregateInputType
  }

  export type GetTechnologyAggregateType<T extends TechnologyAggregateArgs> = {
        [P in keyof T & keyof AggregateTechnology]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTechnology[P]>
      : GetScalarType<T[P], AggregateTechnology[P]>
  }




  export type TechnologyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TechnologyWhereInput
    orderBy?: TechnologyOrderByWithAggregationInput | TechnologyOrderByWithAggregationInput[]
    by: TechnologyScalarFieldEnum[] | TechnologyScalarFieldEnum
    having?: TechnologyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TechnologyCountAggregateInputType | true
    _avg?: TechnologyAvgAggregateInputType
    _sum?: TechnologySumAggregateInputType
    _min?: TechnologyMinAggregateInputType
    _max?: TechnologyMaxAggregateInputType
  }

  export type TechnologyGroupByOutputType = {
    id: string
    title: string
    description: string
    goal: number
    raised: number
    image: string | null
    createdAt: Date
    updatedAt: Date
    _count: TechnologyCountAggregateOutputType | null
    _avg: TechnologyAvgAggregateOutputType | null
    _sum: TechnologySumAggregateOutputType | null
    _min: TechnologyMinAggregateOutputType | null
    _max: TechnologyMaxAggregateOutputType | null
  }

  type GetTechnologyGroupByPayload<T extends TechnologyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TechnologyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TechnologyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TechnologyGroupByOutputType[P]>
            : GetScalarType<T[P], TechnologyGroupByOutputType[P]>
        }
      >
    >


  export type TechnologySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    goal?: boolean
    raised?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["technology"]>

  export type TechnologySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    goal?: boolean
    raised?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["technology"]>

  export type TechnologySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    goal?: boolean
    raised?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["technology"]>

  export type TechnologySelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    goal?: boolean
    raised?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TechnologyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "goal" | "raised" | "image" | "createdAt" | "updatedAt", ExtArgs["result"]["technology"]>

  export type $TechnologyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Technology"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string
      goal: number
      raised: number
      image: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["technology"]>
    composites: {}
  }

  type TechnologyGetPayload<S extends boolean | null | undefined | TechnologyDefaultArgs> = $Result.GetResult<Prisma.$TechnologyPayload, S>

  type TechnologyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TechnologyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TechnologyCountAggregateInputType | true
    }

  export interface TechnologyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Technology'], meta: { name: 'Technology' } }
    /**
     * Find zero or one Technology that matches the filter.
     * @param {TechnologyFindUniqueArgs} args - Arguments to find a Technology
     * @example
     * // Get one Technology
     * const technology = await prisma.technology.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TechnologyFindUniqueArgs>(args: SelectSubset<T, TechnologyFindUniqueArgs<ExtArgs>>): Prisma__TechnologyClient<$Result.GetResult<Prisma.$TechnologyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Technology that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TechnologyFindUniqueOrThrowArgs} args - Arguments to find a Technology
     * @example
     * // Get one Technology
     * const technology = await prisma.technology.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TechnologyFindUniqueOrThrowArgs>(args: SelectSubset<T, TechnologyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TechnologyClient<$Result.GetResult<Prisma.$TechnologyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Technology that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TechnologyFindFirstArgs} args - Arguments to find a Technology
     * @example
     * // Get one Technology
     * const technology = await prisma.technology.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TechnologyFindFirstArgs>(args?: SelectSubset<T, TechnologyFindFirstArgs<ExtArgs>>): Prisma__TechnologyClient<$Result.GetResult<Prisma.$TechnologyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Technology that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TechnologyFindFirstOrThrowArgs} args - Arguments to find a Technology
     * @example
     * // Get one Technology
     * const technology = await prisma.technology.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TechnologyFindFirstOrThrowArgs>(args?: SelectSubset<T, TechnologyFindFirstOrThrowArgs<ExtArgs>>): Prisma__TechnologyClient<$Result.GetResult<Prisma.$TechnologyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Technologies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TechnologyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Technologies
     * const technologies = await prisma.technology.findMany()
     * 
     * // Get first 10 Technologies
     * const technologies = await prisma.technology.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const technologyWithIdOnly = await prisma.technology.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TechnologyFindManyArgs>(args?: SelectSubset<T, TechnologyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TechnologyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Technology.
     * @param {TechnologyCreateArgs} args - Arguments to create a Technology.
     * @example
     * // Create one Technology
     * const Technology = await prisma.technology.create({
     *   data: {
     *     // ... data to create a Technology
     *   }
     * })
     * 
     */
    create<T extends TechnologyCreateArgs>(args: SelectSubset<T, TechnologyCreateArgs<ExtArgs>>): Prisma__TechnologyClient<$Result.GetResult<Prisma.$TechnologyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Technologies.
     * @param {TechnologyCreateManyArgs} args - Arguments to create many Technologies.
     * @example
     * // Create many Technologies
     * const technology = await prisma.technology.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TechnologyCreateManyArgs>(args?: SelectSubset<T, TechnologyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Technologies and returns the data saved in the database.
     * @param {TechnologyCreateManyAndReturnArgs} args - Arguments to create many Technologies.
     * @example
     * // Create many Technologies
     * const technology = await prisma.technology.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Technologies and only return the `id`
     * const technologyWithIdOnly = await prisma.technology.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TechnologyCreateManyAndReturnArgs>(args?: SelectSubset<T, TechnologyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TechnologyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Technology.
     * @param {TechnologyDeleteArgs} args - Arguments to delete one Technology.
     * @example
     * // Delete one Technology
     * const Technology = await prisma.technology.delete({
     *   where: {
     *     // ... filter to delete one Technology
     *   }
     * })
     * 
     */
    delete<T extends TechnologyDeleteArgs>(args: SelectSubset<T, TechnologyDeleteArgs<ExtArgs>>): Prisma__TechnologyClient<$Result.GetResult<Prisma.$TechnologyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Technology.
     * @param {TechnologyUpdateArgs} args - Arguments to update one Technology.
     * @example
     * // Update one Technology
     * const technology = await prisma.technology.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TechnologyUpdateArgs>(args: SelectSubset<T, TechnologyUpdateArgs<ExtArgs>>): Prisma__TechnologyClient<$Result.GetResult<Prisma.$TechnologyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Technologies.
     * @param {TechnologyDeleteManyArgs} args - Arguments to filter Technologies to delete.
     * @example
     * // Delete a few Technologies
     * const { count } = await prisma.technology.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TechnologyDeleteManyArgs>(args?: SelectSubset<T, TechnologyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Technologies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TechnologyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Technologies
     * const technology = await prisma.technology.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TechnologyUpdateManyArgs>(args: SelectSubset<T, TechnologyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Technologies and returns the data updated in the database.
     * @param {TechnologyUpdateManyAndReturnArgs} args - Arguments to update many Technologies.
     * @example
     * // Update many Technologies
     * const technology = await prisma.technology.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Technologies and only return the `id`
     * const technologyWithIdOnly = await prisma.technology.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TechnologyUpdateManyAndReturnArgs>(args: SelectSubset<T, TechnologyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TechnologyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Technology.
     * @param {TechnologyUpsertArgs} args - Arguments to update or create a Technology.
     * @example
     * // Update or create a Technology
     * const technology = await prisma.technology.upsert({
     *   create: {
     *     // ... data to create a Technology
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Technology we want to update
     *   }
     * })
     */
    upsert<T extends TechnologyUpsertArgs>(args: SelectSubset<T, TechnologyUpsertArgs<ExtArgs>>): Prisma__TechnologyClient<$Result.GetResult<Prisma.$TechnologyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Technologies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TechnologyCountArgs} args - Arguments to filter Technologies to count.
     * @example
     * // Count the number of Technologies
     * const count = await prisma.technology.count({
     *   where: {
     *     // ... the filter for the Technologies we want to count
     *   }
     * })
    **/
    count<T extends TechnologyCountArgs>(
      args?: Subset<T, TechnologyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TechnologyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Technology.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TechnologyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TechnologyAggregateArgs>(args: Subset<T, TechnologyAggregateArgs>): Prisma.PrismaPromise<GetTechnologyAggregateType<T>>

    /**
     * Group by Technology.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TechnologyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TechnologyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TechnologyGroupByArgs['orderBy'] }
        : { orderBy?: TechnologyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TechnologyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTechnologyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Technology model
   */
  readonly fields: TechnologyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Technology.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TechnologyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Technology model
   */
  interface TechnologyFieldRefs {
    readonly id: FieldRef<"Technology", 'String'>
    readonly title: FieldRef<"Technology", 'String'>
    readonly description: FieldRef<"Technology", 'String'>
    readonly goal: FieldRef<"Technology", 'Float'>
    readonly raised: FieldRef<"Technology", 'Float'>
    readonly image: FieldRef<"Technology", 'String'>
    readonly createdAt: FieldRef<"Technology", 'DateTime'>
    readonly updatedAt: FieldRef<"Technology", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Technology findUnique
   */
  export type TechnologyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Technology
     */
    select?: TechnologySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Technology
     */
    omit?: TechnologyOmit<ExtArgs> | null
    /**
     * Filter, which Technology to fetch.
     */
    where: TechnologyWhereUniqueInput
  }

  /**
   * Technology findUniqueOrThrow
   */
  export type TechnologyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Technology
     */
    select?: TechnologySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Technology
     */
    omit?: TechnologyOmit<ExtArgs> | null
    /**
     * Filter, which Technology to fetch.
     */
    where: TechnologyWhereUniqueInput
  }

  /**
   * Technology findFirst
   */
  export type TechnologyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Technology
     */
    select?: TechnologySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Technology
     */
    omit?: TechnologyOmit<ExtArgs> | null
    /**
     * Filter, which Technology to fetch.
     */
    where?: TechnologyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Technologies to fetch.
     */
    orderBy?: TechnologyOrderByWithRelationInput | TechnologyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Technologies.
     */
    cursor?: TechnologyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Technologies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Technologies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Technologies.
     */
    distinct?: TechnologyScalarFieldEnum | TechnologyScalarFieldEnum[]
  }

  /**
   * Technology findFirstOrThrow
   */
  export type TechnologyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Technology
     */
    select?: TechnologySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Technology
     */
    omit?: TechnologyOmit<ExtArgs> | null
    /**
     * Filter, which Technology to fetch.
     */
    where?: TechnologyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Technologies to fetch.
     */
    orderBy?: TechnologyOrderByWithRelationInput | TechnologyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Technologies.
     */
    cursor?: TechnologyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Technologies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Technologies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Technologies.
     */
    distinct?: TechnologyScalarFieldEnum | TechnologyScalarFieldEnum[]
  }

  /**
   * Technology findMany
   */
  export type TechnologyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Technology
     */
    select?: TechnologySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Technology
     */
    omit?: TechnologyOmit<ExtArgs> | null
    /**
     * Filter, which Technologies to fetch.
     */
    where?: TechnologyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Technologies to fetch.
     */
    orderBy?: TechnologyOrderByWithRelationInput | TechnologyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Technologies.
     */
    cursor?: TechnologyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Technologies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Technologies.
     */
    skip?: number
    distinct?: TechnologyScalarFieldEnum | TechnologyScalarFieldEnum[]
  }

  /**
   * Technology create
   */
  export type TechnologyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Technology
     */
    select?: TechnologySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Technology
     */
    omit?: TechnologyOmit<ExtArgs> | null
    /**
     * The data needed to create a Technology.
     */
    data: XOR<TechnologyCreateInput, TechnologyUncheckedCreateInput>
  }

  /**
   * Technology createMany
   */
  export type TechnologyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Technologies.
     */
    data: TechnologyCreateManyInput | TechnologyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Technology createManyAndReturn
   */
  export type TechnologyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Technology
     */
    select?: TechnologySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Technology
     */
    omit?: TechnologyOmit<ExtArgs> | null
    /**
     * The data used to create many Technologies.
     */
    data: TechnologyCreateManyInput | TechnologyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Technology update
   */
  export type TechnologyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Technology
     */
    select?: TechnologySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Technology
     */
    omit?: TechnologyOmit<ExtArgs> | null
    /**
     * The data needed to update a Technology.
     */
    data: XOR<TechnologyUpdateInput, TechnologyUncheckedUpdateInput>
    /**
     * Choose, which Technology to update.
     */
    where: TechnologyWhereUniqueInput
  }

  /**
   * Technology updateMany
   */
  export type TechnologyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Technologies.
     */
    data: XOR<TechnologyUpdateManyMutationInput, TechnologyUncheckedUpdateManyInput>
    /**
     * Filter which Technologies to update
     */
    where?: TechnologyWhereInput
    /**
     * Limit how many Technologies to update.
     */
    limit?: number
  }

  /**
   * Technology updateManyAndReturn
   */
  export type TechnologyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Technology
     */
    select?: TechnologySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Technology
     */
    omit?: TechnologyOmit<ExtArgs> | null
    /**
     * The data used to update Technologies.
     */
    data: XOR<TechnologyUpdateManyMutationInput, TechnologyUncheckedUpdateManyInput>
    /**
     * Filter which Technologies to update
     */
    where?: TechnologyWhereInput
    /**
     * Limit how many Technologies to update.
     */
    limit?: number
  }

  /**
   * Technology upsert
   */
  export type TechnologyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Technology
     */
    select?: TechnologySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Technology
     */
    omit?: TechnologyOmit<ExtArgs> | null
    /**
     * The filter to search for the Technology to update in case it exists.
     */
    where: TechnologyWhereUniqueInput
    /**
     * In case the Technology found by the `where` argument doesn't exist, create a new Technology with this data.
     */
    create: XOR<TechnologyCreateInput, TechnologyUncheckedCreateInput>
    /**
     * In case the Technology was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TechnologyUpdateInput, TechnologyUncheckedUpdateInput>
  }

  /**
   * Technology delete
   */
  export type TechnologyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Technology
     */
    select?: TechnologySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Technology
     */
    omit?: TechnologyOmit<ExtArgs> | null
    /**
     * Filter which Technology to delete.
     */
    where: TechnologyWhereUniqueInput
  }

  /**
   * Technology deleteMany
   */
  export type TechnologyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Technologies to delete
     */
    where?: TechnologyWhereInput
    /**
     * Limit how many Technologies to delete.
     */
    limit?: number
  }

  /**
   * Technology without action
   */
  export type TechnologyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Technology
     */
    select?: TechnologySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Technology
     */
    omit?: TechnologyOmit<ExtArgs> | null
  }


  /**
   * Model Art
   */

  export type AggregateArt = {
    _count: ArtCountAggregateOutputType | null
    _avg: ArtAvgAggregateOutputType | null
    _sum: ArtSumAggregateOutputType | null
    _min: ArtMinAggregateOutputType | null
    _max: ArtMaxAggregateOutputType | null
  }

  export type ArtAvgAggregateOutputType = {
    goal: number | null
    raised: number | null
  }

  export type ArtSumAggregateOutputType = {
    goal: number | null
    raised: number | null
  }

  export type ArtMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    goal: number | null
    raised: number | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ArtMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    goal: number | null
    raised: number | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ArtCountAggregateOutputType = {
    id: number
    title: number
    description: number
    goal: number
    raised: number
    image: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ArtAvgAggregateInputType = {
    goal?: true
    raised?: true
  }

  export type ArtSumAggregateInputType = {
    goal?: true
    raised?: true
  }

  export type ArtMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    goal?: true
    raised?: true
    image?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ArtMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    goal?: true
    raised?: true
    image?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ArtCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    goal?: true
    raised?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ArtAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Art to aggregate.
     */
    where?: ArtWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Arts to fetch.
     */
    orderBy?: ArtOrderByWithRelationInput | ArtOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ArtWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Arts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Arts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Arts
    **/
    _count?: true | ArtCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ArtAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ArtSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArtMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArtMaxAggregateInputType
  }

  export type GetArtAggregateType<T extends ArtAggregateArgs> = {
        [P in keyof T & keyof AggregateArt]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArt[P]>
      : GetScalarType<T[P], AggregateArt[P]>
  }




  export type ArtGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArtWhereInput
    orderBy?: ArtOrderByWithAggregationInput | ArtOrderByWithAggregationInput[]
    by: ArtScalarFieldEnum[] | ArtScalarFieldEnum
    having?: ArtScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArtCountAggregateInputType | true
    _avg?: ArtAvgAggregateInputType
    _sum?: ArtSumAggregateInputType
    _min?: ArtMinAggregateInputType
    _max?: ArtMaxAggregateInputType
  }

  export type ArtGroupByOutputType = {
    id: string
    title: string
    description: string
    goal: number
    raised: number
    image: string | null
    createdAt: Date
    updatedAt: Date
    _count: ArtCountAggregateOutputType | null
    _avg: ArtAvgAggregateOutputType | null
    _sum: ArtSumAggregateOutputType | null
    _min: ArtMinAggregateOutputType | null
    _max: ArtMaxAggregateOutputType | null
  }

  type GetArtGroupByPayload<T extends ArtGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArtGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArtGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArtGroupByOutputType[P]>
            : GetScalarType<T[P], ArtGroupByOutputType[P]>
        }
      >
    >


  export type ArtSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    goal?: boolean
    raised?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["art"]>

  export type ArtSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    goal?: boolean
    raised?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["art"]>

  export type ArtSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    goal?: boolean
    raised?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["art"]>

  export type ArtSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    goal?: boolean
    raised?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ArtOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "goal" | "raised" | "image" | "createdAt" | "updatedAt", ExtArgs["result"]["art"]>

  export type $ArtPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Art"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string
      goal: number
      raised: number
      image: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["art"]>
    composites: {}
  }

  type ArtGetPayload<S extends boolean | null | undefined | ArtDefaultArgs> = $Result.GetResult<Prisma.$ArtPayload, S>

  type ArtCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ArtFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ArtCountAggregateInputType | true
    }

  export interface ArtDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Art'], meta: { name: 'Art' } }
    /**
     * Find zero or one Art that matches the filter.
     * @param {ArtFindUniqueArgs} args - Arguments to find a Art
     * @example
     * // Get one Art
     * const art = await prisma.art.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ArtFindUniqueArgs>(args: SelectSubset<T, ArtFindUniqueArgs<ExtArgs>>): Prisma__ArtClient<$Result.GetResult<Prisma.$ArtPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Art that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ArtFindUniqueOrThrowArgs} args - Arguments to find a Art
     * @example
     * // Get one Art
     * const art = await prisma.art.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ArtFindUniqueOrThrowArgs>(args: SelectSubset<T, ArtFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ArtClient<$Result.GetResult<Prisma.$ArtPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Art that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtFindFirstArgs} args - Arguments to find a Art
     * @example
     * // Get one Art
     * const art = await prisma.art.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ArtFindFirstArgs>(args?: SelectSubset<T, ArtFindFirstArgs<ExtArgs>>): Prisma__ArtClient<$Result.GetResult<Prisma.$ArtPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Art that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtFindFirstOrThrowArgs} args - Arguments to find a Art
     * @example
     * // Get one Art
     * const art = await prisma.art.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ArtFindFirstOrThrowArgs>(args?: SelectSubset<T, ArtFindFirstOrThrowArgs<ExtArgs>>): Prisma__ArtClient<$Result.GetResult<Prisma.$ArtPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Arts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Arts
     * const arts = await prisma.art.findMany()
     * 
     * // Get first 10 Arts
     * const arts = await prisma.art.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const artWithIdOnly = await prisma.art.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ArtFindManyArgs>(args?: SelectSubset<T, ArtFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArtPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Art.
     * @param {ArtCreateArgs} args - Arguments to create a Art.
     * @example
     * // Create one Art
     * const Art = await prisma.art.create({
     *   data: {
     *     // ... data to create a Art
     *   }
     * })
     * 
     */
    create<T extends ArtCreateArgs>(args: SelectSubset<T, ArtCreateArgs<ExtArgs>>): Prisma__ArtClient<$Result.GetResult<Prisma.$ArtPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Arts.
     * @param {ArtCreateManyArgs} args - Arguments to create many Arts.
     * @example
     * // Create many Arts
     * const art = await prisma.art.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ArtCreateManyArgs>(args?: SelectSubset<T, ArtCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Arts and returns the data saved in the database.
     * @param {ArtCreateManyAndReturnArgs} args - Arguments to create many Arts.
     * @example
     * // Create many Arts
     * const art = await prisma.art.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Arts and only return the `id`
     * const artWithIdOnly = await prisma.art.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ArtCreateManyAndReturnArgs>(args?: SelectSubset<T, ArtCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArtPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Art.
     * @param {ArtDeleteArgs} args - Arguments to delete one Art.
     * @example
     * // Delete one Art
     * const Art = await prisma.art.delete({
     *   where: {
     *     // ... filter to delete one Art
     *   }
     * })
     * 
     */
    delete<T extends ArtDeleteArgs>(args: SelectSubset<T, ArtDeleteArgs<ExtArgs>>): Prisma__ArtClient<$Result.GetResult<Prisma.$ArtPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Art.
     * @param {ArtUpdateArgs} args - Arguments to update one Art.
     * @example
     * // Update one Art
     * const art = await prisma.art.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ArtUpdateArgs>(args: SelectSubset<T, ArtUpdateArgs<ExtArgs>>): Prisma__ArtClient<$Result.GetResult<Prisma.$ArtPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Arts.
     * @param {ArtDeleteManyArgs} args - Arguments to filter Arts to delete.
     * @example
     * // Delete a few Arts
     * const { count } = await prisma.art.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ArtDeleteManyArgs>(args?: SelectSubset<T, ArtDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Arts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Arts
     * const art = await prisma.art.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ArtUpdateManyArgs>(args: SelectSubset<T, ArtUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Arts and returns the data updated in the database.
     * @param {ArtUpdateManyAndReturnArgs} args - Arguments to update many Arts.
     * @example
     * // Update many Arts
     * const art = await prisma.art.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Arts and only return the `id`
     * const artWithIdOnly = await prisma.art.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ArtUpdateManyAndReturnArgs>(args: SelectSubset<T, ArtUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArtPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Art.
     * @param {ArtUpsertArgs} args - Arguments to update or create a Art.
     * @example
     * // Update or create a Art
     * const art = await prisma.art.upsert({
     *   create: {
     *     // ... data to create a Art
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Art we want to update
     *   }
     * })
     */
    upsert<T extends ArtUpsertArgs>(args: SelectSubset<T, ArtUpsertArgs<ExtArgs>>): Prisma__ArtClient<$Result.GetResult<Prisma.$ArtPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Arts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtCountArgs} args - Arguments to filter Arts to count.
     * @example
     * // Count the number of Arts
     * const count = await prisma.art.count({
     *   where: {
     *     // ... the filter for the Arts we want to count
     *   }
     * })
    **/
    count<T extends ArtCountArgs>(
      args?: Subset<T, ArtCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArtCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Art.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ArtAggregateArgs>(args: Subset<T, ArtAggregateArgs>): Prisma.PrismaPromise<GetArtAggregateType<T>>

    /**
     * Group by Art.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ArtGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArtGroupByArgs['orderBy'] }
        : { orderBy?: ArtGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ArtGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArtGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Art model
   */
  readonly fields: ArtFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Art.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArtClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Art model
   */
  interface ArtFieldRefs {
    readonly id: FieldRef<"Art", 'String'>
    readonly title: FieldRef<"Art", 'String'>
    readonly description: FieldRef<"Art", 'String'>
    readonly goal: FieldRef<"Art", 'Float'>
    readonly raised: FieldRef<"Art", 'Float'>
    readonly image: FieldRef<"Art", 'String'>
    readonly createdAt: FieldRef<"Art", 'DateTime'>
    readonly updatedAt: FieldRef<"Art", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Art findUnique
   */
  export type ArtFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Art
     */
    select?: ArtSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Art
     */
    omit?: ArtOmit<ExtArgs> | null
    /**
     * Filter, which Art to fetch.
     */
    where: ArtWhereUniqueInput
  }

  /**
   * Art findUniqueOrThrow
   */
  export type ArtFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Art
     */
    select?: ArtSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Art
     */
    omit?: ArtOmit<ExtArgs> | null
    /**
     * Filter, which Art to fetch.
     */
    where: ArtWhereUniqueInput
  }

  /**
   * Art findFirst
   */
  export type ArtFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Art
     */
    select?: ArtSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Art
     */
    omit?: ArtOmit<ExtArgs> | null
    /**
     * Filter, which Art to fetch.
     */
    where?: ArtWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Arts to fetch.
     */
    orderBy?: ArtOrderByWithRelationInput | ArtOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Arts.
     */
    cursor?: ArtWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Arts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Arts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Arts.
     */
    distinct?: ArtScalarFieldEnum | ArtScalarFieldEnum[]
  }

  /**
   * Art findFirstOrThrow
   */
  export type ArtFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Art
     */
    select?: ArtSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Art
     */
    omit?: ArtOmit<ExtArgs> | null
    /**
     * Filter, which Art to fetch.
     */
    where?: ArtWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Arts to fetch.
     */
    orderBy?: ArtOrderByWithRelationInput | ArtOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Arts.
     */
    cursor?: ArtWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Arts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Arts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Arts.
     */
    distinct?: ArtScalarFieldEnum | ArtScalarFieldEnum[]
  }

  /**
   * Art findMany
   */
  export type ArtFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Art
     */
    select?: ArtSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Art
     */
    omit?: ArtOmit<ExtArgs> | null
    /**
     * Filter, which Arts to fetch.
     */
    where?: ArtWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Arts to fetch.
     */
    orderBy?: ArtOrderByWithRelationInput | ArtOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Arts.
     */
    cursor?: ArtWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Arts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Arts.
     */
    skip?: number
    distinct?: ArtScalarFieldEnum | ArtScalarFieldEnum[]
  }

  /**
   * Art create
   */
  export type ArtCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Art
     */
    select?: ArtSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Art
     */
    omit?: ArtOmit<ExtArgs> | null
    /**
     * The data needed to create a Art.
     */
    data: XOR<ArtCreateInput, ArtUncheckedCreateInput>
  }

  /**
   * Art createMany
   */
  export type ArtCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Arts.
     */
    data: ArtCreateManyInput | ArtCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Art createManyAndReturn
   */
  export type ArtCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Art
     */
    select?: ArtSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Art
     */
    omit?: ArtOmit<ExtArgs> | null
    /**
     * The data used to create many Arts.
     */
    data: ArtCreateManyInput | ArtCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Art update
   */
  export type ArtUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Art
     */
    select?: ArtSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Art
     */
    omit?: ArtOmit<ExtArgs> | null
    /**
     * The data needed to update a Art.
     */
    data: XOR<ArtUpdateInput, ArtUncheckedUpdateInput>
    /**
     * Choose, which Art to update.
     */
    where: ArtWhereUniqueInput
  }

  /**
   * Art updateMany
   */
  export type ArtUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Arts.
     */
    data: XOR<ArtUpdateManyMutationInput, ArtUncheckedUpdateManyInput>
    /**
     * Filter which Arts to update
     */
    where?: ArtWhereInput
    /**
     * Limit how many Arts to update.
     */
    limit?: number
  }

  /**
   * Art updateManyAndReturn
   */
  export type ArtUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Art
     */
    select?: ArtSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Art
     */
    omit?: ArtOmit<ExtArgs> | null
    /**
     * The data used to update Arts.
     */
    data: XOR<ArtUpdateManyMutationInput, ArtUncheckedUpdateManyInput>
    /**
     * Filter which Arts to update
     */
    where?: ArtWhereInput
    /**
     * Limit how many Arts to update.
     */
    limit?: number
  }

  /**
   * Art upsert
   */
  export type ArtUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Art
     */
    select?: ArtSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Art
     */
    omit?: ArtOmit<ExtArgs> | null
    /**
     * The filter to search for the Art to update in case it exists.
     */
    where: ArtWhereUniqueInput
    /**
     * In case the Art found by the `where` argument doesn't exist, create a new Art with this data.
     */
    create: XOR<ArtCreateInput, ArtUncheckedCreateInput>
    /**
     * In case the Art was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArtUpdateInput, ArtUncheckedUpdateInput>
  }

  /**
   * Art delete
   */
  export type ArtDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Art
     */
    select?: ArtSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Art
     */
    omit?: ArtOmit<ExtArgs> | null
    /**
     * Filter which Art to delete.
     */
    where: ArtWhereUniqueInput
  }

  /**
   * Art deleteMany
   */
  export type ArtDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Arts to delete
     */
    where?: ArtWhereInput
    /**
     * Limit how many Arts to delete.
     */
    limit?: number
  }

  /**
   * Art without action
   */
  export type ArtDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Art
     */
    select?: ArtSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Art
     */
    omit?: ArtOmit<ExtArgs> | null
  }


  /**
   * Model Entrepreneurship
   */

  export type AggregateEntrepreneurship = {
    _count: EntrepreneurshipCountAggregateOutputType | null
    _avg: EntrepreneurshipAvgAggregateOutputType | null
    _sum: EntrepreneurshipSumAggregateOutputType | null
    _min: EntrepreneurshipMinAggregateOutputType | null
    _max: EntrepreneurshipMaxAggregateOutputType | null
  }

  export type EntrepreneurshipAvgAggregateOutputType = {
    goal: number | null
    raised: number | null
  }

  export type EntrepreneurshipSumAggregateOutputType = {
    goal: number | null
    raised: number | null
  }

  export type EntrepreneurshipMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    goal: number | null
    raised: number | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EntrepreneurshipMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    goal: number | null
    raised: number | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EntrepreneurshipCountAggregateOutputType = {
    id: number
    title: number
    description: number
    goal: number
    raised: number
    image: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EntrepreneurshipAvgAggregateInputType = {
    goal?: true
    raised?: true
  }

  export type EntrepreneurshipSumAggregateInputType = {
    goal?: true
    raised?: true
  }

  export type EntrepreneurshipMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    goal?: true
    raised?: true
    image?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EntrepreneurshipMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    goal?: true
    raised?: true
    image?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EntrepreneurshipCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    goal?: true
    raised?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EntrepreneurshipAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Entrepreneurship to aggregate.
     */
    where?: EntrepreneurshipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Entrepreneurships to fetch.
     */
    orderBy?: EntrepreneurshipOrderByWithRelationInput | EntrepreneurshipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EntrepreneurshipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Entrepreneurships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Entrepreneurships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Entrepreneurships
    **/
    _count?: true | EntrepreneurshipCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EntrepreneurshipAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EntrepreneurshipSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EntrepreneurshipMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EntrepreneurshipMaxAggregateInputType
  }

  export type GetEntrepreneurshipAggregateType<T extends EntrepreneurshipAggregateArgs> = {
        [P in keyof T & keyof AggregateEntrepreneurship]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEntrepreneurship[P]>
      : GetScalarType<T[P], AggregateEntrepreneurship[P]>
  }




  export type EntrepreneurshipGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EntrepreneurshipWhereInput
    orderBy?: EntrepreneurshipOrderByWithAggregationInput | EntrepreneurshipOrderByWithAggregationInput[]
    by: EntrepreneurshipScalarFieldEnum[] | EntrepreneurshipScalarFieldEnum
    having?: EntrepreneurshipScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EntrepreneurshipCountAggregateInputType | true
    _avg?: EntrepreneurshipAvgAggregateInputType
    _sum?: EntrepreneurshipSumAggregateInputType
    _min?: EntrepreneurshipMinAggregateInputType
    _max?: EntrepreneurshipMaxAggregateInputType
  }

  export type EntrepreneurshipGroupByOutputType = {
    id: string
    title: string
    description: string
    goal: number
    raised: number
    image: string | null
    createdAt: Date
    updatedAt: Date
    _count: EntrepreneurshipCountAggregateOutputType | null
    _avg: EntrepreneurshipAvgAggregateOutputType | null
    _sum: EntrepreneurshipSumAggregateOutputType | null
    _min: EntrepreneurshipMinAggregateOutputType | null
    _max: EntrepreneurshipMaxAggregateOutputType | null
  }

  type GetEntrepreneurshipGroupByPayload<T extends EntrepreneurshipGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EntrepreneurshipGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EntrepreneurshipGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EntrepreneurshipGroupByOutputType[P]>
            : GetScalarType<T[P], EntrepreneurshipGroupByOutputType[P]>
        }
      >
    >


  export type EntrepreneurshipSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    goal?: boolean
    raised?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["entrepreneurship"]>

  export type EntrepreneurshipSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    goal?: boolean
    raised?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["entrepreneurship"]>

  export type EntrepreneurshipSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    goal?: boolean
    raised?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["entrepreneurship"]>

  export type EntrepreneurshipSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    goal?: boolean
    raised?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EntrepreneurshipOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "goal" | "raised" | "image" | "createdAt" | "updatedAt", ExtArgs["result"]["entrepreneurship"]>

  export type $EntrepreneurshipPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Entrepreneurship"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string
      goal: number
      raised: number
      image: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["entrepreneurship"]>
    composites: {}
  }

  type EntrepreneurshipGetPayload<S extends boolean | null | undefined | EntrepreneurshipDefaultArgs> = $Result.GetResult<Prisma.$EntrepreneurshipPayload, S>

  type EntrepreneurshipCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EntrepreneurshipFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EntrepreneurshipCountAggregateInputType | true
    }

  export interface EntrepreneurshipDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Entrepreneurship'], meta: { name: 'Entrepreneurship' } }
    /**
     * Find zero or one Entrepreneurship that matches the filter.
     * @param {EntrepreneurshipFindUniqueArgs} args - Arguments to find a Entrepreneurship
     * @example
     * // Get one Entrepreneurship
     * const entrepreneurship = await prisma.entrepreneurship.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EntrepreneurshipFindUniqueArgs>(args: SelectSubset<T, EntrepreneurshipFindUniqueArgs<ExtArgs>>): Prisma__EntrepreneurshipClient<$Result.GetResult<Prisma.$EntrepreneurshipPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Entrepreneurship that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EntrepreneurshipFindUniqueOrThrowArgs} args - Arguments to find a Entrepreneurship
     * @example
     * // Get one Entrepreneurship
     * const entrepreneurship = await prisma.entrepreneurship.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EntrepreneurshipFindUniqueOrThrowArgs>(args: SelectSubset<T, EntrepreneurshipFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EntrepreneurshipClient<$Result.GetResult<Prisma.$EntrepreneurshipPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Entrepreneurship that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntrepreneurshipFindFirstArgs} args - Arguments to find a Entrepreneurship
     * @example
     * // Get one Entrepreneurship
     * const entrepreneurship = await prisma.entrepreneurship.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EntrepreneurshipFindFirstArgs>(args?: SelectSubset<T, EntrepreneurshipFindFirstArgs<ExtArgs>>): Prisma__EntrepreneurshipClient<$Result.GetResult<Prisma.$EntrepreneurshipPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Entrepreneurship that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntrepreneurshipFindFirstOrThrowArgs} args - Arguments to find a Entrepreneurship
     * @example
     * // Get one Entrepreneurship
     * const entrepreneurship = await prisma.entrepreneurship.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EntrepreneurshipFindFirstOrThrowArgs>(args?: SelectSubset<T, EntrepreneurshipFindFirstOrThrowArgs<ExtArgs>>): Prisma__EntrepreneurshipClient<$Result.GetResult<Prisma.$EntrepreneurshipPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Entrepreneurships that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntrepreneurshipFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Entrepreneurships
     * const entrepreneurships = await prisma.entrepreneurship.findMany()
     * 
     * // Get first 10 Entrepreneurships
     * const entrepreneurships = await prisma.entrepreneurship.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const entrepreneurshipWithIdOnly = await prisma.entrepreneurship.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EntrepreneurshipFindManyArgs>(args?: SelectSubset<T, EntrepreneurshipFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntrepreneurshipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Entrepreneurship.
     * @param {EntrepreneurshipCreateArgs} args - Arguments to create a Entrepreneurship.
     * @example
     * // Create one Entrepreneurship
     * const Entrepreneurship = await prisma.entrepreneurship.create({
     *   data: {
     *     // ... data to create a Entrepreneurship
     *   }
     * })
     * 
     */
    create<T extends EntrepreneurshipCreateArgs>(args: SelectSubset<T, EntrepreneurshipCreateArgs<ExtArgs>>): Prisma__EntrepreneurshipClient<$Result.GetResult<Prisma.$EntrepreneurshipPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Entrepreneurships.
     * @param {EntrepreneurshipCreateManyArgs} args - Arguments to create many Entrepreneurships.
     * @example
     * // Create many Entrepreneurships
     * const entrepreneurship = await prisma.entrepreneurship.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EntrepreneurshipCreateManyArgs>(args?: SelectSubset<T, EntrepreneurshipCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Entrepreneurships and returns the data saved in the database.
     * @param {EntrepreneurshipCreateManyAndReturnArgs} args - Arguments to create many Entrepreneurships.
     * @example
     * // Create many Entrepreneurships
     * const entrepreneurship = await prisma.entrepreneurship.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Entrepreneurships and only return the `id`
     * const entrepreneurshipWithIdOnly = await prisma.entrepreneurship.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EntrepreneurshipCreateManyAndReturnArgs>(args?: SelectSubset<T, EntrepreneurshipCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntrepreneurshipPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Entrepreneurship.
     * @param {EntrepreneurshipDeleteArgs} args - Arguments to delete one Entrepreneurship.
     * @example
     * // Delete one Entrepreneurship
     * const Entrepreneurship = await prisma.entrepreneurship.delete({
     *   where: {
     *     // ... filter to delete one Entrepreneurship
     *   }
     * })
     * 
     */
    delete<T extends EntrepreneurshipDeleteArgs>(args: SelectSubset<T, EntrepreneurshipDeleteArgs<ExtArgs>>): Prisma__EntrepreneurshipClient<$Result.GetResult<Prisma.$EntrepreneurshipPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Entrepreneurship.
     * @param {EntrepreneurshipUpdateArgs} args - Arguments to update one Entrepreneurship.
     * @example
     * // Update one Entrepreneurship
     * const entrepreneurship = await prisma.entrepreneurship.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EntrepreneurshipUpdateArgs>(args: SelectSubset<T, EntrepreneurshipUpdateArgs<ExtArgs>>): Prisma__EntrepreneurshipClient<$Result.GetResult<Prisma.$EntrepreneurshipPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Entrepreneurships.
     * @param {EntrepreneurshipDeleteManyArgs} args - Arguments to filter Entrepreneurships to delete.
     * @example
     * // Delete a few Entrepreneurships
     * const { count } = await prisma.entrepreneurship.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EntrepreneurshipDeleteManyArgs>(args?: SelectSubset<T, EntrepreneurshipDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Entrepreneurships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntrepreneurshipUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Entrepreneurships
     * const entrepreneurship = await prisma.entrepreneurship.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EntrepreneurshipUpdateManyArgs>(args: SelectSubset<T, EntrepreneurshipUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Entrepreneurships and returns the data updated in the database.
     * @param {EntrepreneurshipUpdateManyAndReturnArgs} args - Arguments to update many Entrepreneurships.
     * @example
     * // Update many Entrepreneurships
     * const entrepreneurship = await prisma.entrepreneurship.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Entrepreneurships and only return the `id`
     * const entrepreneurshipWithIdOnly = await prisma.entrepreneurship.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EntrepreneurshipUpdateManyAndReturnArgs>(args: SelectSubset<T, EntrepreneurshipUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntrepreneurshipPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Entrepreneurship.
     * @param {EntrepreneurshipUpsertArgs} args - Arguments to update or create a Entrepreneurship.
     * @example
     * // Update or create a Entrepreneurship
     * const entrepreneurship = await prisma.entrepreneurship.upsert({
     *   create: {
     *     // ... data to create a Entrepreneurship
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Entrepreneurship we want to update
     *   }
     * })
     */
    upsert<T extends EntrepreneurshipUpsertArgs>(args: SelectSubset<T, EntrepreneurshipUpsertArgs<ExtArgs>>): Prisma__EntrepreneurshipClient<$Result.GetResult<Prisma.$EntrepreneurshipPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Entrepreneurships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntrepreneurshipCountArgs} args - Arguments to filter Entrepreneurships to count.
     * @example
     * // Count the number of Entrepreneurships
     * const count = await prisma.entrepreneurship.count({
     *   where: {
     *     // ... the filter for the Entrepreneurships we want to count
     *   }
     * })
    **/
    count<T extends EntrepreneurshipCountArgs>(
      args?: Subset<T, EntrepreneurshipCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EntrepreneurshipCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Entrepreneurship.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntrepreneurshipAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EntrepreneurshipAggregateArgs>(args: Subset<T, EntrepreneurshipAggregateArgs>): Prisma.PrismaPromise<GetEntrepreneurshipAggregateType<T>>

    /**
     * Group by Entrepreneurship.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntrepreneurshipGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EntrepreneurshipGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EntrepreneurshipGroupByArgs['orderBy'] }
        : { orderBy?: EntrepreneurshipGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EntrepreneurshipGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEntrepreneurshipGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Entrepreneurship model
   */
  readonly fields: EntrepreneurshipFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Entrepreneurship.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EntrepreneurshipClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Entrepreneurship model
   */
  interface EntrepreneurshipFieldRefs {
    readonly id: FieldRef<"Entrepreneurship", 'String'>
    readonly title: FieldRef<"Entrepreneurship", 'String'>
    readonly description: FieldRef<"Entrepreneurship", 'String'>
    readonly goal: FieldRef<"Entrepreneurship", 'Float'>
    readonly raised: FieldRef<"Entrepreneurship", 'Float'>
    readonly image: FieldRef<"Entrepreneurship", 'String'>
    readonly createdAt: FieldRef<"Entrepreneurship", 'DateTime'>
    readonly updatedAt: FieldRef<"Entrepreneurship", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Entrepreneurship findUnique
   */
  export type EntrepreneurshipFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entrepreneurship
     */
    select?: EntrepreneurshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Entrepreneurship
     */
    omit?: EntrepreneurshipOmit<ExtArgs> | null
    /**
     * Filter, which Entrepreneurship to fetch.
     */
    where: EntrepreneurshipWhereUniqueInput
  }

  /**
   * Entrepreneurship findUniqueOrThrow
   */
  export type EntrepreneurshipFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entrepreneurship
     */
    select?: EntrepreneurshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Entrepreneurship
     */
    omit?: EntrepreneurshipOmit<ExtArgs> | null
    /**
     * Filter, which Entrepreneurship to fetch.
     */
    where: EntrepreneurshipWhereUniqueInput
  }

  /**
   * Entrepreneurship findFirst
   */
  export type EntrepreneurshipFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entrepreneurship
     */
    select?: EntrepreneurshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Entrepreneurship
     */
    omit?: EntrepreneurshipOmit<ExtArgs> | null
    /**
     * Filter, which Entrepreneurship to fetch.
     */
    where?: EntrepreneurshipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Entrepreneurships to fetch.
     */
    orderBy?: EntrepreneurshipOrderByWithRelationInput | EntrepreneurshipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Entrepreneurships.
     */
    cursor?: EntrepreneurshipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Entrepreneurships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Entrepreneurships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Entrepreneurships.
     */
    distinct?: EntrepreneurshipScalarFieldEnum | EntrepreneurshipScalarFieldEnum[]
  }

  /**
   * Entrepreneurship findFirstOrThrow
   */
  export type EntrepreneurshipFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entrepreneurship
     */
    select?: EntrepreneurshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Entrepreneurship
     */
    omit?: EntrepreneurshipOmit<ExtArgs> | null
    /**
     * Filter, which Entrepreneurship to fetch.
     */
    where?: EntrepreneurshipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Entrepreneurships to fetch.
     */
    orderBy?: EntrepreneurshipOrderByWithRelationInput | EntrepreneurshipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Entrepreneurships.
     */
    cursor?: EntrepreneurshipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Entrepreneurships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Entrepreneurships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Entrepreneurships.
     */
    distinct?: EntrepreneurshipScalarFieldEnum | EntrepreneurshipScalarFieldEnum[]
  }

  /**
   * Entrepreneurship findMany
   */
  export type EntrepreneurshipFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entrepreneurship
     */
    select?: EntrepreneurshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Entrepreneurship
     */
    omit?: EntrepreneurshipOmit<ExtArgs> | null
    /**
     * Filter, which Entrepreneurships to fetch.
     */
    where?: EntrepreneurshipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Entrepreneurships to fetch.
     */
    orderBy?: EntrepreneurshipOrderByWithRelationInput | EntrepreneurshipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Entrepreneurships.
     */
    cursor?: EntrepreneurshipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Entrepreneurships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Entrepreneurships.
     */
    skip?: number
    distinct?: EntrepreneurshipScalarFieldEnum | EntrepreneurshipScalarFieldEnum[]
  }

  /**
   * Entrepreneurship create
   */
  export type EntrepreneurshipCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entrepreneurship
     */
    select?: EntrepreneurshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Entrepreneurship
     */
    omit?: EntrepreneurshipOmit<ExtArgs> | null
    /**
     * The data needed to create a Entrepreneurship.
     */
    data: XOR<EntrepreneurshipCreateInput, EntrepreneurshipUncheckedCreateInput>
  }

  /**
   * Entrepreneurship createMany
   */
  export type EntrepreneurshipCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Entrepreneurships.
     */
    data: EntrepreneurshipCreateManyInput | EntrepreneurshipCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Entrepreneurship createManyAndReturn
   */
  export type EntrepreneurshipCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entrepreneurship
     */
    select?: EntrepreneurshipSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Entrepreneurship
     */
    omit?: EntrepreneurshipOmit<ExtArgs> | null
    /**
     * The data used to create many Entrepreneurships.
     */
    data: EntrepreneurshipCreateManyInput | EntrepreneurshipCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Entrepreneurship update
   */
  export type EntrepreneurshipUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entrepreneurship
     */
    select?: EntrepreneurshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Entrepreneurship
     */
    omit?: EntrepreneurshipOmit<ExtArgs> | null
    /**
     * The data needed to update a Entrepreneurship.
     */
    data: XOR<EntrepreneurshipUpdateInput, EntrepreneurshipUncheckedUpdateInput>
    /**
     * Choose, which Entrepreneurship to update.
     */
    where: EntrepreneurshipWhereUniqueInput
  }

  /**
   * Entrepreneurship updateMany
   */
  export type EntrepreneurshipUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Entrepreneurships.
     */
    data: XOR<EntrepreneurshipUpdateManyMutationInput, EntrepreneurshipUncheckedUpdateManyInput>
    /**
     * Filter which Entrepreneurships to update
     */
    where?: EntrepreneurshipWhereInput
    /**
     * Limit how many Entrepreneurships to update.
     */
    limit?: number
  }

  /**
   * Entrepreneurship updateManyAndReturn
   */
  export type EntrepreneurshipUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entrepreneurship
     */
    select?: EntrepreneurshipSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Entrepreneurship
     */
    omit?: EntrepreneurshipOmit<ExtArgs> | null
    /**
     * The data used to update Entrepreneurships.
     */
    data: XOR<EntrepreneurshipUpdateManyMutationInput, EntrepreneurshipUncheckedUpdateManyInput>
    /**
     * Filter which Entrepreneurships to update
     */
    where?: EntrepreneurshipWhereInput
    /**
     * Limit how many Entrepreneurships to update.
     */
    limit?: number
  }

  /**
   * Entrepreneurship upsert
   */
  export type EntrepreneurshipUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entrepreneurship
     */
    select?: EntrepreneurshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Entrepreneurship
     */
    omit?: EntrepreneurshipOmit<ExtArgs> | null
    /**
     * The filter to search for the Entrepreneurship to update in case it exists.
     */
    where: EntrepreneurshipWhereUniqueInput
    /**
     * In case the Entrepreneurship found by the `where` argument doesn't exist, create a new Entrepreneurship with this data.
     */
    create: XOR<EntrepreneurshipCreateInput, EntrepreneurshipUncheckedCreateInput>
    /**
     * In case the Entrepreneurship was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EntrepreneurshipUpdateInput, EntrepreneurshipUncheckedUpdateInput>
  }

  /**
   * Entrepreneurship delete
   */
  export type EntrepreneurshipDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entrepreneurship
     */
    select?: EntrepreneurshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Entrepreneurship
     */
    omit?: EntrepreneurshipOmit<ExtArgs> | null
    /**
     * Filter which Entrepreneurship to delete.
     */
    where: EntrepreneurshipWhereUniqueInput
  }

  /**
   * Entrepreneurship deleteMany
   */
  export type EntrepreneurshipDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Entrepreneurships to delete
     */
    where?: EntrepreneurshipWhereInput
    /**
     * Limit how many Entrepreneurships to delete.
     */
    limit?: number
  }

  /**
   * Entrepreneurship without action
   */
  export type EntrepreneurshipDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entrepreneurship
     */
    select?: EntrepreneurshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Entrepreneurship
     */
    omit?: EntrepreneurshipOmit<ExtArgs> | null
  }


  /**
   * Model Activity
   */

  export type AggregateActivity = {
    _count: ActivityCountAggregateOutputType | null
    _min: ActivityMinAggregateOutputType | null
    _max: ActivityMaxAggregateOutputType | null
  }

  export type ActivityMinAggregateOutputType = {
    id: string | null
    objetivo: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ActivityMaxAggregateOutputType = {
    id: string | null
    objetivo: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ActivityCountAggregateOutputType = {
    id: number
    objetivo: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ActivityMinAggregateInputType = {
    id?: true
    objetivo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ActivityMaxAggregateInputType = {
    id?: true
    objetivo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ActivityCountAggregateInputType = {
    id?: true
    objetivo?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ActivityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Activity to aggregate.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Activities
    **/
    _count?: true | ActivityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActivityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActivityMaxAggregateInputType
  }

  export type GetActivityAggregateType<T extends ActivityAggregateArgs> = {
        [P in keyof T & keyof AggregateActivity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActivity[P]>
      : GetScalarType<T[P], AggregateActivity[P]>
  }




  export type ActivityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityWhereInput
    orderBy?: ActivityOrderByWithAggregationInput | ActivityOrderByWithAggregationInput[]
    by: ActivityScalarFieldEnum[] | ActivityScalarFieldEnum
    having?: ActivityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActivityCountAggregateInputType | true
    _min?: ActivityMinAggregateInputType
    _max?: ActivityMaxAggregateInputType
  }

  export type ActivityGroupByOutputType = {
    id: string
    objetivo: string
    createdAt: Date
    updatedAt: Date
    _count: ActivityCountAggregateOutputType | null
    _min: ActivityMinAggregateOutputType | null
    _max: ActivityMaxAggregateOutputType | null
  }

  type GetActivityGroupByPayload<T extends ActivityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActivityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActivityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActivityGroupByOutputType[P]>
            : GetScalarType<T[P], ActivityGroupByOutputType[P]>
        }
      >
    >


  export type ActivitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    objetivo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["activity"]>

  export type ActivitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    objetivo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["activity"]>

  export type ActivitySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    objetivo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["activity"]>

  export type ActivitySelectScalar = {
    id?: boolean
    objetivo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ActivityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "objetivo" | "createdAt" | "updatedAt", ExtArgs["result"]["activity"]>

  export type $ActivityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Activity"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      objetivo: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["activity"]>
    composites: {}
  }

  type ActivityGetPayload<S extends boolean | null | undefined | ActivityDefaultArgs> = $Result.GetResult<Prisma.$ActivityPayload, S>

  type ActivityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ActivityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActivityCountAggregateInputType | true
    }

  export interface ActivityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Activity'], meta: { name: 'Activity' } }
    /**
     * Find zero or one Activity that matches the filter.
     * @param {ActivityFindUniqueArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActivityFindUniqueArgs>(args: SelectSubset<T, ActivityFindUniqueArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Activity that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ActivityFindUniqueOrThrowArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActivityFindUniqueOrThrowArgs>(args: SelectSubset<T, ActivityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Activity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindFirstArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActivityFindFirstArgs>(args?: SelectSubset<T, ActivityFindFirstArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Activity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindFirstOrThrowArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActivityFindFirstOrThrowArgs>(args?: SelectSubset<T, ActivityFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Activities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Activities
     * const activities = await prisma.activity.findMany()
     * 
     * // Get first 10 Activities
     * const activities = await prisma.activity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activityWithIdOnly = await prisma.activity.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActivityFindManyArgs>(args?: SelectSubset<T, ActivityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Activity.
     * @param {ActivityCreateArgs} args - Arguments to create a Activity.
     * @example
     * // Create one Activity
     * const Activity = await prisma.activity.create({
     *   data: {
     *     // ... data to create a Activity
     *   }
     * })
     * 
     */
    create<T extends ActivityCreateArgs>(args: SelectSubset<T, ActivityCreateArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Activities.
     * @param {ActivityCreateManyArgs} args - Arguments to create many Activities.
     * @example
     * // Create many Activities
     * const activity = await prisma.activity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActivityCreateManyArgs>(args?: SelectSubset<T, ActivityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Activities and returns the data saved in the database.
     * @param {ActivityCreateManyAndReturnArgs} args - Arguments to create many Activities.
     * @example
     * // Create many Activities
     * const activity = await prisma.activity.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Activities and only return the `id`
     * const activityWithIdOnly = await prisma.activity.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActivityCreateManyAndReturnArgs>(args?: SelectSubset<T, ActivityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Activity.
     * @param {ActivityDeleteArgs} args - Arguments to delete one Activity.
     * @example
     * // Delete one Activity
     * const Activity = await prisma.activity.delete({
     *   where: {
     *     // ... filter to delete one Activity
     *   }
     * })
     * 
     */
    delete<T extends ActivityDeleteArgs>(args: SelectSubset<T, ActivityDeleteArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Activity.
     * @param {ActivityUpdateArgs} args - Arguments to update one Activity.
     * @example
     * // Update one Activity
     * const activity = await prisma.activity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActivityUpdateArgs>(args: SelectSubset<T, ActivityUpdateArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Activities.
     * @param {ActivityDeleteManyArgs} args - Arguments to filter Activities to delete.
     * @example
     * // Delete a few Activities
     * const { count } = await prisma.activity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActivityDeleteManyArgs>(args?: SelectSubset<T, ActivityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Activities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Activities
     * const activity = await prisma.activity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActivityUpdateManyArgs>(args: SelectSubset<T, ActivityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Activities and returns the data updated in the database.
     * @param {ActivityUpdateManyAndReturnArgs} args - Arguments to update many Activities.
     * @example
     * // Update many Activities
     * const activity = await prisma.activity.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Activities and only return the `id`
     * const activityWithIdOnly = await prisma.activity.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ActivityUpdateManyAndReturnArgs>(args: SelectSubset<T, ActivityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Activity.
     * @param {ActivityUpsertArgs} args - Arguments to update or create a Activity.
     * @example
     * // Update or create a Activity
     * const activity = await prisma.activity.upsert({
     *   create: {
     *     // ... data to create a Activity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Activity we want to update
     *   }
     * })
     */
    upsert<T extends ActivityUpsertArgs>(args: SelectSubset<T, ActivityUpsertArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Activities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityCountArgs} args - Arguments to filter Activities to count.
     * @example
     * // Count the number of Activities
     * const count = await prisma.activity.count({
     *   where: {
     *     // ... the filter for the Activities we want to count
     *   }
     * })
    **/
    count<T extends ActivityCountArgs>(
      args?: Subset<T, ActivityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActivityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Activity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActivityAggregateArgs>(args: Subset<T, ActivityAggregateArgs>): Prisma.PrismaPromise<GetActivityAggregateType<T>>

    /**
     * Group by Activity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActivityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActivityGroupByArgs['orderBy'] }
        : { orderBy?: ActivityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActivityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActivityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Activity model
   */
  readonly fields: ActivityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Activity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActivityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Activity model
   */
  interface ActivityFieldRefs {
    readonly id: FieldRef<"Activity", 'String'>
    readonly objetivo: FieldRef<"Activity", 'String'>
    readonly createdAt: FieldRef<"Activity", 'DateTime'>
    readonly updatedAt: FieldRef<"Activity", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Activity findUnique
   */
  export type ActivityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity findUniqueOrThrow
   */
  export type ActivityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity findFirst
   */
  export type ActivityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Activities.
     */
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity findFirstOrThrow
   */
  export type ActivityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Activities.
     */
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity findMany
   */
  export type ActivityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Filter, which Activities to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity create
   */
  export type ActivityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * The data needed to create a Activity.
     */
    data: XOR<ActivityCreateInput, ActivityUncheckedCreateInput>
  }

  /**
   * Activity createMany
   */
  export type ActivityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Activities.
     */
    data: ActivityCreateManyInput | ActivityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Activity createManyAndReturn
   */
  export type ActivityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * The data used to create many Activities.
     */
    data: ActivityCreateManyInput | ActivityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Activity update
   */
  export type ActivityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * The data needed to update a Activity.
     */
    data: XOR<ActivityUpdateInput, ActivityUncheckedUpdateInput>
    /**
     * Choose, which Activity to update.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity updateMany
   */
  export type ActivityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Activities.
     */
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyInput>
    /**
     * Filter which Activities to update
     */
    where?: ActivityWhereInput
    /**
     * Limit how many Activities to update.
     */
    limit?: number
  }

  /**
   * Activity updateManyAndReturn
   */
  export type ActivityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * The data used to update Activities.
     */
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyInput>
    /**
     * Filter which Activities to update
     */
    where?: ActivityWhereInput
    /**
     * Limit how many Activities to update.
     */
    limit?: number
  }

  /**
   * Activity upsert
   */
  export type ActivityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * The filter to search for the Activity to update in case it exists.
     */
    where: ActivityWhereUniqueInput
    /**
     * In case the Activity found by the `where` argument doesn't exist, create a new Activity with this data.
     */
    create: XOR<ActivityCreateInput, ActivityUncheckedCreateInput>
    /**
     * In case the Activity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActivityUpdateInput, ActivityUncheckedUpdateInput>
  }

  /**
   * Activity delete
   */
  export type ActivityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Filter which Activity to delete.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity deleteMany
   */
  export type ActivityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Activities to delete
     */
    where?: ActivityWhereInput
    /**
     * Limit how many Activities to delete.
     */
    limit?: number
  }

  /**
   * Activity without action
   */
  export type ActivityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const HealthScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    goal: 'goal',
    raised: 'raised',
    image: 'image',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type HealthScalarFieldEnum = (typeof HealthScalarFieldEnum)[keyof typeof HealthScalarFieldEnum]


  export const EducationScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    goal: 'goal',
    raised: 'raised',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EducationScalarFieldEnum = (typeof EducationScalarFieldEnum)[keyof typeof EducationScalarFieldEnum]


  export const TechnologyScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    goal: 'goal',
    raised: 'raised',
    image: 'image',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TechnologyScalarFieldEnum = (typeof TechnologyScalarFieldEnum)[keyof typeof TechnologyScalarFieldEnum]


  export const ArtScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    goal: 'goal',
    raised: 'raised',
    image: 'image',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ArtScalarFieldEnum = (typeof ArtScalarFieldEnum)[keyof typeof ArtScalarFieldEnum]


  export const EntrepreneurshipScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    goal: 'goal',
    raised: 'raised',
    image: 'image',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EntrepreneurshipScalarFieldEnum = (typeof EntrepreneurshipScalarFieldEnum)[keyof typeof EntrepreneurshipScalarFieldEnum]


  export const ActivityScalarFieldEnum: {
    id: 'id',
    objetivo: 'objetivo',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ActivityScalarFieldEnum = (typeof ActivityScalarFieldEnum)[keyof typeof ActivityScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type HealthWhereInput = {
    AND?: HealthWhereInput | HealthWhereInput[]
    OR?: HealthWhereInput[]
    NOT?: HealthWhereInput | HealthWhereInput[]
    id?: StringFilter<"Health"> | string
    title?: StringFilter<"Health"> | string
    description?: StringFilter<"Health"> | string
    goal?: FloatFilter<"Health"> | number
    raised?: FloatFilter<"Health"> | number
    image?: StringNullableFilter<"Health"> | string | null
    createdAt?: DateTimeFilter<"Health"> | Date | string
    updatedAt?: DateTimeFilter<"Health"> | Date | string
  }

  export type HealthOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    goal?: SortOrder
    raised?: SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HealthWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: HealthWhereInput | HealthWhereInput[]
    OR?: HealthWhereInput[]
    NOT?: HealthWhereInput | HealthWhereInput[]
    title?: StringFilter<"Health"> | string
    description?: StringFilter<"Health"> | string
    goal?: FloatFilter<"Health"> | number
    raised?: FloatFilter<"Health"> | number
    image?: StringNullableFilter<"Health"> | string | null
    createdAt?: DateTimeFilter<"Health"> | Date | string
    updatedAt?: DateTimeFilter<"Health"> | Date | string
  }, "id">

  export type HealthOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    goal?: SortOrder
    raised?: SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: HealthCountOrderByAggregateInput
    _avg?: HealthAvgOrderByAggregateInput
    _max?: HealthMaxOrderByAggregateInput
    _min?: HealthMinOrderByAggregateInput
    _sum?: HealthSumOrderByAggregateInput
  }

  export type HealthScalarWhereWithAggregatesInput = {
    AND?: HealthScalarWhereWithAggregatesInput | HealthScalarWhereWithAggregatesInput[]
    OR?: HealthScalarWhereWithAggregatesInput[]
    NOT?: HealthScalarWhereWithAggregatesInput | HealthScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Health"> | string
    title?: StringWithAggregatesFilter<"Health"> | string
    description?: StringWithAggregatesFilter<"Health"> | string
    goal?: FloatWithAggregatesFilter<"Health"> | number
    raised?: FloatWithAggregatesFilter<"Health"> | number
    image?: StringNullableWithAggregatesFilter<"Health"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Health"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Health"> | Date | string
  }

  export type EducationWhereInput = {
    AND?: EducationWhereInput | EducationWhereInput[]
    OR?: EducationWhereInput[]
    NOT?: EducationWhereInput | EducationWhereInput[]
    id?: StringFilter<"Education"> | string
    title?: StringFilter<"Education"> | string
    description?: StringFilter<"Education"> | string
    goal?: FloatFilter<"Education"> | number
    raised?: FloatFilter<"Education"> | number
    createdAt?: DateTimeFilter<"Education"> | Date | string
    updatedAt?: DateTimeFilter<"Education"> | Date | string
  }

  export type EducationOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    goal?: SortOrder
    raised?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EducationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EducationWhereInput | EducationWhereInput[]
    OR?: EducationWhereInput[]
    NOT?: EducationWhereInput | EducationWhereInput[]
    title?: StringFilter<"Education"> | string
    description?: StringFilter<"Education"> | string
    goal?: FloatFilter<"Education"> | number
    raised?: FloatFilter<"Education"> | number
    createdAt?: DateTimeFilter<"Education"> | Date | string
    updatedAt?: DateTimeFilter<"Education"> | Date | string
  }, "id">

  export type EducationOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    goal?: SortOrder
    raised?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EducationCountOrderByAggregateInput
    _avg?: EducationAvgOrderByAggregateInput
    _max?: EducationMaxOrderByAggregateInput
    _min?: EducationMinOrderByAggregateInput
    _sum?: EducationSumOrderByAggregateInput
  }

  export type EducationScalarWhereWithAggregatesInput = {
    AND?: EducationScalarWhereWithAggregatesInput | EducationScalarWhereWithAggregatesInput[]
    OR?: EducationScalarWhereWithAggregatesInput[]
    NOT?: EducationScalarWhereWithAggregatesInput | EducationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Education"> | string
    title?: StringWithAggregatesFilter<"Education"> | string
    description?: StringWithAggregatesFilter<"Education"> | string
    goal?: FloatWithAggregatesFilter<"Education"> | number
    raised?: FloatWithAggregatesFilter<"Education"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Education"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Education"> | Date | string
  }

  export type TechnologyWhereInput = {
    AND?: TechnologyWhereInput | TechnologyWhereInput[]
    OR?: TechnologyWhereInput[]
    NOT?: TechnologyWhereInput | TechnologyWhereInput[]
    id?: StringFilter<"Technology"> | string
    title?: StringFilter<"Technology"> | string
    description?: StringFilter<"Technology"> | string
    goal?: FloatFilter<"Technology"> | number
    raised?: FloatFilter<"Technology"> | number
    image?: StringNullableFilter<"Technology"> | string | null
    createdAt?: DateTimeFilter<"Technology"> | Date | string
    updatedAt?: DateTimeFilter<"Technology"> | Date | string
  }

  export type TechnologyOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    goal?: SortOrder
    raised?: SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TechnologyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TechnologyWhereInput | TechnologyWhereInput[]
    OR?: TechnologyWhereInput[]
    NOT?: TechnologyWhereInput | TechnologyWhereInput[]
    title?: StringFilter<"Technology"> | string
    description?: StringFilter<"Technology"> | string
    goal?: FloatFilter<"Technology"> | number
    raised?: FloatFilter<"Technology"> | number
    image?: StringNullableFilter<"Technology"> | string | null
    createdAt?: DateTimeFilter<"Technology"> | Date | string
    updatedAt?: DateTimeFilter<"Technology"> | Date | string
  }, "id">

  export type TechnologyOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    goal?: SortOrder
    raised?: SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TechnologyCountOrderByAggregateInput
    _avg?: TechnologyAvgOrderByAggregateInput
    _max?: TechnologyMaxOrderByAggregateInput
    _min?: TechnologyMinOrderByAggregateInput
    _sum?: TechnologySumOrderByAggregateInput
  }

  export type TechnologyScalarWhereWithAggregatesInput = {
    AND?: TechnologyScalarWhereWithAggregatesInput | TechnologyScalarWhereWithAggregatesInput[]
    OR?: TechnologyScalarWhereWithAggregatesInput[]
    NOT?: TechnologyScalarWhereWithAggregatesInput | TechnologyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Technology"> | string
    title?: StringWithAggregatesFilter<"Technology"> | string
    description?: StringWithAggregatesFilter<"Technology"> | string
    goal?: FloatWithAggregatesFilter<"Technology"> | number
    raised?: FloatWithAggregatesFilter<"Technology"> | number
    image?: StringNullableWithAggregatesFilter<"Technology"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Technology"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Technology"> | Date | string
  }

  export type ArtWhereInput = {
    AND?: ArtWhereInput | ArtWhereInput[]
    OR?: ArtWhereInput[]
    NOT?: ArtWhereInput | ArtWhereInput[]
    id?: StringFilter<"Art"> | string
    title?: StringFilter<"Art"> | string
    description?: StringFilter<"Art"> | string
    goal?: FloatFilter<"Art"> | number
    raised?: FloatFilter<"Art"> | number
    image?: StringNullableFilter<"Art"> | string | null
    createdAt?: DateTimeFilter<"Art"> | Date | string
    updatedAt?: DateTimeFilter<"Art"> | Date | string
  }

  export type ArtOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    goal?: SortOrder
    raised?: SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArtWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ArtWhereInput | ArtWhereInput[]
    OR?: ArtWhereInput[]
    NOT?: ArtWhereInput | ArtWhereInput[]
    title?: StringFilter<"Art"> | string
    description?: StringFilter<"Art"> | string
    goal?: FloatFilter<"Art"> | number
    raised?: FloatFilter<"Art"> | number
    image?: StringNullableFilter<"Art"> | string | null
    createdAt?: DateTimeFilter<"Art"> | Date | string
    updatedAt?: DateTimeFilter<"Art"> | Date | string
  }, "id">

  export type ArtOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    goal?: SortOrder
    raised?: SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ArtCountOrderByAggregateInput
    _avg?: ArtAvgOrderByAggregateInput
    _max?: ArtMaxOrderByAggregateInput
    _min?: ArtMinOrderByAggregateInput
    _sum?: ArtSumOrderByAggregateInput
  }

  export type ArtScalarWhereWithAggregatesInput = {
    AND?: ArtScalarWhereWithAggregatesInput | ArtScalarWhereWithAggregatesInput[]
    OR?: ArtScalarWhereWithAggregatesInput[]
    NOT?: ArtScalarWhereWithAggregatesInput | ArtScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Art"> | string
    title?: StringWithAggregatesFilter<"Art"> | string
    description?: StringWithAggregatesFilter<"Art"> | string
    goal?: FloatWithAggregatesFilter<"Art"> | number
    raised?: FloatWithAggregatesFilter<"Art"> | number
    image?: StringNullableWithAggregatesFilter<"Art"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Art"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Art"> | Date | string
  }

  export type EntrepreneurshipWhereInput = {
    AND?: EntrepreneurshipWhereInput | EntrepreneurshipWhereInput[]
    OR?: EntrepreneurshipWhereInput[]
    NOT?: EntrepreneurshipWhereInput | EntrepreneurshipWhereInput[]
    id?: StringFilter<"Entrepreneurship"> | string
    title?: StringFilter<"Entrepreneurship"> | string
    description?: StringFilter<"Entrepreneurship"> | string
    goal?: FloatFilter<"Entrepreneurship"> | number
    raised?: FloatFilter<"Entrepreneurship"> | number
    image?: StringNullableFilter<"Entrepreneurship"> | string | null
    createdAt?: DateTimeFilter<"Entrepreneurship"> | Date | string
    updatedAt?: DateTimeFilter<"Entrepreneurship"> | Date | string
  }

  export type EntrepreneurshipOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    goal?: SortOrder
    raised?: SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EntrepreneurshipWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EntrepreneurshipWhereInput | EntrepreneurshipWhereInput[]
    OR?: EntrepreneurshipWhereInput[]
    NOT?: EntrepreneurshipWhereInput | EntrepreneurshipWhereInput[]
    title?: StringFilter<"Entrepreneurship"> | string
    description?: StringFilter<"Entrepreneurship"> | string
    goal?: FloatFilter<"Entrepreneurship"> | number
    raised?: FloatFilter<"Entrepreneurship"> | number
    image?: StringNullableFilter<"Entrepreneurship"> | string | null
    createdAt?: DateTimeFilter<"Entrepreneurship"> | Date | string
    updatedAt?: DateTimeFilter<"Entrepreneurship"> | Date | string
  }, "id">

  export type EntrepreneurshipOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    goal?: SortOrder
    raised?: SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EntrepreneurshipCountOrderByAggregateInput
    _avg?: EntrepreneurshipAvgOrderByAggregateInput
    _max?: EntrepreneurshipMaxOrderByAggregateInput
    _min?: EntrepreneurshipMinOrderByAggregateInput
    _sum?: EntrepreneurshipSumOrderByAggregateInput
  }

  export type EntrepreneurshipScalarWhereWithAggregatesInput = {
    AND?: EntrepreneurshipScalarWhereWithAggregatesInput | EntrepreneurshipScalarWhereWithAggregatesInput[]
    OR?: EntrepreneurshipScalarWhereWithAggregatesInput[]
    NOT?: EntrepreneurshipScalarWhereWithAggregatesInput | EntrepreneurshipScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Entrepreneurship"> | string
    title?: StringWithAggregatesFilter<"Entrepreneurship"> | string
    description?: StringWithAggregatesFilter<"Entrepreneurship"> | string
    goal?: FloatWithAggregatesFilter<"Entrepreneurship"> | number
    raised?: FloatWithAggregatesFilter<"Entrepreneurship"> | number
    image?: StringNullableWithAggregatesFilter<"Entrepreneurship"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Entrepreneurship"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Entrepreneurship"> | Date | string
  }

  export type ActivityWhereInput = {
    AND?: ActivityWhereInput | ActivityWhereInput[]
    OR?: ActivityWhereInput[]
    NOT?: ActivityWhereInput | ActivityWhereInput[]
    id?: StringFilter<"Activity"> | string
    objetivo?: StringFilter<"Activity"> | string
    createdAt?: DateTimeFilter<"Activity"> | Date | string
    updatedAt?: DateTimeFilter<"Activity"> | Date | string
  }

  export type ActivityOrderByWithRelationInput = {
    id?: SortOrder
    objetivo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ActivityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ActivityWhereInput | ActivityWhereInput[]
    OR?: ActivityWhereInput[]
    NOT?: ActivityWhereInput | ActivityWhereInput[]
    objetivo?: StringFilter<"Activity"> | string
    createdAt?: DateTimeFilter<"Activity"> | Date | string
    updatedAt?: DateTimeFilter<"Activity"> | Date | string
  }, "id">

  export type ActivityOrderByWithAggregationInput = {
    id?: SortOrder
    objetivo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ActivityCountOrderByAggregateInput
    _max?: ActivityMaxOrderByAggregateInput
    _min?: ActivityMinOrderByAggregateInput
  }

  export type ActivityScalarWhereWithAggregatesInput = {
    AND?: ActivityScalarWhereWithAggregatesInput | ActivityScalarWhereWithAggregatesInput[]
    OR?: ActivityScalarWhereWithAggregatesInput[]
    NOT?: ActivityScalarWhereWithAggregatesInput | ActivityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Activity"> | string
    objetivo?: StringWithAggregatesFilter<"Activity"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Activity"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Activity"> | Date | string
  }

  export type HealthCreateInput = {
    id?: string
    title: string
    description: string
    goal: number
    raised: number
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HealthUncheckedCreateInput = {
    id?: string
    title: string
    description: string
    goal: number
    raised: number
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HealthUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    goal?: FloatFieldUpdateOperationsInput | number
    raised?: FloatFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HealthUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    goal?: FloatFieldUpdateOperationsInput | number
    raised?: FloatFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HealthCreateManyInput = {
    id?: string
    title: string
    description: string
    goal: number
    raised: number
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HealthUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    goal?: FloatFieldUpdateOperationsInput | number
    raised?: FloatFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HealthUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    goal?: FloatFieldUpdateOperationsInput | number
    raised?: FloatFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EducationCreateInput = {
    id?: string
    title: string
    description: string
    goal: number
    raised: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EducationUncheckedCreateInput = {
    id?: string
    title: string
    description: string
    goal: number
    raised: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EducationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    goal?: FloatFieldUpdateOperationsInput | number
    raised?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EducationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    goal?: FloatFieldUpdateOperationsInput | number
    raised?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EducationCreateManyInput = {
    id?: string
    title: string
    description: string
    goal: number
    raised: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EducationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    goal?: FloatFieldUpdateOperationsInput | number
    raised?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EducationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    goal?: FloatFieldUpdateOperationsInput | number
    raised?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TechnologyCreateInput = {
    id?: string
    title: string
    description: string
    goal: number
    raised: number
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TechnologyUncheckedCreateInput = {
    id?: string
    title: string
    description: string
    goal: number
    raised: number
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TechnologyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    goal?: FloatFieldUpdateOperationsInput | number
    raised?: FloatFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TechnologyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    goal?: FloatFieldUpdateOperationsInput | number
    raised?: FloatFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TechnologyCreateManyInput = {
    id?: string
    title: string
    description: string
    goal: number
    raised: number
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TechnologyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    goal?: FloatFieldUpdateOperationsInput | number
    raised?: FloatFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TechnologyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    goal?: FloatFieldUpdateOperationsInput | number
    raised?: FloatFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArtCreateInput = {
    id?: string
    title: string
    description: string
    goal: number
    raised: number
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArtUncheckedCreateInput = {
    id?: string
    title: string
    description: string
    goal: number
    raised: number
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArtUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    goal?: FloatFieldUpdateOperationsInput | number
    raised?: FloatFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArtUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    goal?: FloatFieldUpdateOperationsInput | number
    raised?: FloatFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArtCreateManyInput = {
    id?: string
    title: string
    description: string
    goal: number
    raised: number
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArtUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    goal?: FloatFieldUpdateOperationsInput | number
    raised?: FloatFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArtUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    goal?: FloatFieldUpdateOperationsInput | number
    raised?: FloatFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntrepreneurshipCreateInput = {
    id?: string
    title: string
    description: string
    goal: number
    raised: number
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EntrepreneurshipUncheckedCreateInput = {
    id?: string
    title: string
    description: string
    goal: number
    raised: number
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EntrepreneurshipUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    goal?: FloatFieldUpdateOperationsInput | number
    raised?: FloatFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntrepreneurshipUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    goal?: FloatFieldUpdateOperationsInput | number
    raised?: FloatFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntrepreneurshipCreateManyInput = {
    id?: string
    title: string
    description: string
    goal: number
    raised: number
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EntrepreneurshipUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    goal?: FloatFieldUpdateOperationsInput | number
    raised?: FloatFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntrepreneurshipUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    goal?: FloatFieldUpdateOperationsInput | number
    raised?: FloatFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityCreateInput = {
    id?: string
    objetivo: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActivityUncheckedCreateInput = {
    id?: string
    objetivo: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActivityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    objetivo?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    objetivo?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityCreateManyInput = {
    id?: string
    objetivo: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActivityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    objetivo?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    objetivo?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type HealthCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    goal?: SortOrder
    raised?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HealthAvgOrderByAggregateInput = {
    goal?: SortOrder
    raised?: SortOrder
  }

  export type HealthMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    goal?: SortOrder
    raised?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HealthMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    goal?: SortOrder
    raised?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HealthSumOrderByAggregateInput = {
    goal?: SortOrder
    raised?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EducationCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    goal?: SortOrder
    raised?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EducationAvgOrderByAggregateInput = {
    goal?: SortOrder
    raised?: SortOrder
  }

  export type EducationMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    goal?: SortOrder
    raised?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EducationMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    goal?: SortOrder
    raised?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EducationSumOrderByAggregateInput = {
    goal?: SortOrder
    raised?: SortOrder
  }

  export type TechnologyCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    goal?: SortOrder
    raised?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TechnologyAvgOrderByAggregateInput = {
    goal?: SortOrder
    raised?: SortOrder
  }

  export type TechnologyMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    goal?: SortOrder
    raised?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TechnologyMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    goal?: SortOrder
    raised?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TechnologySumOrderByAggregateInput = {
    goal?: SortOrder
    raised?: SortOrder
  }

  export type ArtCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    goal?: SortOrder
    raised?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArtAvgOrderByAggregateInput = {
    goal?: SortOrder
    raised?: SortOrder
  }

  export type ArtMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    goal?: SortOrder
    raised?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArtMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    goal?: SortOrder
    raised?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArtSumOrderByAggregateInput = {
    goal?: SortOrder
    raised?: SortOrder
  }

  export type EntrepreneurshipCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    goal?: SortOrder
    raised?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EntrepreneurshipAvgOrderByAggregateInput = {
    goal?: SortOrder
    raised?: SortOrder
  }

  export type EntrepreneurshipMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    goal?: SortOrder
    raised?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EntrepreneurshipMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    goal?: SortOrder
    raised?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EntrepreneurshipSumOrderByAggregateInput = {
    goal?: SortOrder
    raised?: SortOrder
  }

  export type ActivityCountOrderByAggregateInput = {
    id?: SortOrder
    objetivo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ActivityMaxOrderByAggregateInput = {
    id?: SortOrder
    objetivo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ActivityMinOrderByAggregateInput = {
    id?: SortOrder
    objetivo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}