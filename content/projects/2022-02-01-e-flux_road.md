---
title: Road.io (Formerly E-Flux)
startDate: 2022-02-01
endDate: 2023-12-31
thumbnail: /assets/e-flux_road.jpg
type: Professional
description: My first project via Team Rockstars IT was working as a Full-Stack
  Engineer for Road.io (Formerly E-Flux). Road.io develops and maintains a
  platform for electric vehicle charging and management. I worked on the
  back-end of the platform, which is built with Node.js and MongoDB. I also
  worked on the front-end, which is built with React and Semantic UI.
---
# Road.io (Formerly E-Flux)

My first project via Team Rockstars IT was at Road.io (Formerly E-Flux). My position at Road.io was full-stack web developer within their initially small development team. E-Flux is a company that makes software to support and manage the charging of electric vehicles by facilitating communication between chargers with thousands of customers and various providers who license (whitelabel) our software. 

- - -

## Technologies & Frameworks

<ul class="icon-list">
<li>Node.js <a href="https://nodejs.org/en"><img src="/assets/nodejs.png" alt="icon"></a></li>
<li>React.js <a href="https://react.dev/"><img src="/assets/react.png" alt="icon"></a></li>
<li>MongoDB <a href="https://www.mongodb.com/"><img src="/assets/mongodb.png" alt="icon"></a></li>
<li>Mongoose <a href="https://mongoosejs.com/"><img src="/assets/mongoose.png" alt="icon"></a></li>
<li>Google Cloud Platform <a href="https://cloud.google.com/"><img src="/assets/google-cloud-platform.png" alt="icon"></a></li>
<li>Semantic UI React <a href="https://react.semantic-ui.com/"><img src="/assets/semantic-ui-react.png" alt="icon"></a></li>
<li>OCPP <a href="https://openchargealliance.org/"><img src="/assets/ocpp.png" alt="icon"></a></li>
<li>OCPI <a href="https://evroaming.org/"><img src="/assets/ocpi.png" alt="icon"></a></li>
<li>OpenApi <a href="https://www.openapis.org/"><img src="/assets/openapi.png" alt="icon"></a></li>
<li>GitHub <a href="https://github.com/"><img src="/assets/github.png" alt="icon"></a></li>
</ul>

- - -

## Screens

<div class="images-grid">
<img src="/assets/dashboard.e-flux.io_.png" />
<img src="/assets/dashboard.e-flux.io_-1-.png" />
<img src="/assets/schermafbeelding-2024-01-25-163305.png" />
<img src="/assets/dsc00700.jpg" />
</div>

<div class="video-container"><iframe class="youtube-embed" src="https://www.youtube.com/embed/WZ2oaUdtNgc" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen> </iframe></div>

- - -

## Summary

Within my position I work on the various software systems that support the business operations of the company E-Flux. Technologies used are React.js, Node.js, MongoDB, Mongoose, Koa and much more. The system is based on many different components and IOT concepts, so network communication is also highly relevant. I was able to further develop various parts of the software systems, including front-end improvements for users and administrators, new features/screens, new/extended API calls, 3rd party integrations with our system, general maintenance of the entire system and expanding testing coverage by a lot.

For a large part I was active in the Roaming team within the Road.io (Formerly E-Flux) engineering team which was responsible for ensuring the roaming capabilities of the chargers we operate to allow other charging networks' users to utilize them and vice versa.

I started working with Road.io when they were still a start-up with a very small development team (less than 3 full time engineers) and worked with them for about 2 years. Within that time I was able to see the company grow and expand their engineering team and development ambitions.

- - -

<details >
<summary>Code Snippets</summary>
<div>

The following are some code snippets of components of the software product I've worked on and am proud of. The snippets demonstrate clean, concise and powerful code. *(Code has been compacted in some cases).*

***CDR Service***\
This piece of code belongs to the CDR service of the back-end system of Road.io. A CDR is a Charge Detail Record and stores the details of a single session on an electric charger. The CDR service is responsible for certain actions involving CDRS such as creating, updating the price, marking as Accepted, Rejected etc. The file is written in typescript and a Event Driven Architecture was used to build this part of the system.

```typescript
interface CdrCreateArgs {
  cdrId: string;
  externalCdrId: string;
  source: CDRSource;
  contractId: string;
  startTime: Date;
  endTime: Date;
  evseId: string;
  powerType: PowerType;
  connectorId: number;
  cost: {
    currency: string;
    totalCost: string;
    totalEnergyCost?: string;
    totalFixedCost?: string;
    totalParkingCost?: string;
    totalReservationCost?: string;
  };
  chargingPeriods: [{ startTime: Date; dimension: { type: ChargingPeriod_Dimension_DimensionType; value: number } }];
  status?: CdrStatus;
}

interface CdrSearchArgs {
  cdrId?: string;
  externalCdrId?: string;
  source?: string;
  contractId?: string;
  evseId?: string;
  cost?: object;
  status?: CdrStatus;
  sort: {
    field: string;
    order: 'asc' | 'desc';
  };
  skip: number;
  limit: number;
  ids?: string[];
  id?: string;
  searchPhrase?: string;
  endTime?: object;
}

export class CdrStatusChangeException extends InputValidationException {
  constructor(statusFrom: CdrStatus, statusTo: CdrStatus) {
    super(
      `Cannot update CDR status from ${capitalize(statusFrom)} to ${capitalize(statusTo)}`,
      'CDR_STATUS_CHANGE_EXCEPTION'
    );
  }
}

export class CdrPricingEventException extends InputValidationException {
  constructor() {
    super('Cannot update price of a already billed CDR', 'CDR_PRICING_EVENT_EXCEPTION');
  }
}

export class CdrAlreadyExistsException extends MultipleIdenticalResourcesFoundException {
  constructor(cdrId: string) {
    super(`CDR with cdrId ${cdrId} already exists`);
  }
}

export async function emitNatsEvent(subject: string, message: AnyMessage) {
  try {
    const natsClient = container.resolve(NATSClient);
    await natsClient.publish(subject, Message.fromEvent(message));
  } catch (e) {
    logger.error(`Error while publishing CDRCostChangedEvent: ${e.message}`);
    throw new Error(`Failed to publish CDRCostChangedEvent event: ${e.message}`);
  }
}

@singleton()
export class CdrService {
  constructor(private readonly cdrRepository: CdrRepository) {}

  async getCdr(cdrId: string): Promise<Cdr> {
    const cdr = await this.cdrRepository.load(cdrId);
    if (!cdr) throw new EntityNotFoundError('CDR', cdrId);
    return this.mapToDomainModel(cdr);
  }

  async getCdrByCdrId(cdrId: string): Promise<Cdr> {
    const cdr = await this.cdrRepository.findOne({ cdrId });
    if (!cdr) throw new EntityNotFoundError('CDR', cdrId);
    return this.mapToDomainModel(cdr);
  }

  async create(cdr: CdrCreateArgs): Promise<Cdr> {
    const existingCdr = await this.cdrRepository.findOne({ cdrId: cdr.cdrId });

    if (existingCdr) {
      throw new CdrAlreadyExistsException(cdr.cdrId);
    }

    return this.mapToDomainModel(await this.cdrRepository.create(cdr));
  }

  async updatePrice(cdrId: string, totalCost: string): Promise<Cdr> {
    const currentCdr = await this.cdrRepository.load(cdrId);
    if (currentCdr.status === CdrStatus.BILLED) {
      throw new CdrPricingEventException();
    }
    currentCdr.cost.totalCost = totalCost;
    await this.cdrRepository.update(currentCdr);
    return this.mapToDomainModel(currentCdr);
  }

  async updateStatus(cdrId: string, status: CdrStatus): Promise<Cdr> {
    const currentCdr = await this.cdrRepository.load(cdrId);

    switch (currentCdr.status) {
      case status:
        return this.mapToDomainModel(currentCdr); // No change
      case CdrStatus.PENDING:
        if (status !== CdrStatus.ACCEPTED && status !== CdrStatus.REJECTED) {
          throw new CdrStatusChangeException(currentCdr.status, status); // Pending can only be changed to accepted or rejected
        }
        break;
      case CdrStatus.ACCEPTED:
        if (status !== CdrStatus.BILLED) throw new CdrStatusChangeException(currentCdr.status, status); // Accepted can only be changed to billed
        break;
      case CdrStatus.REJECTED:
      case CdrStatus.BILLED:
        throw new CdrStatusChangeException(currentCdr.status, status); // Cannot change status of a billed or rejected cdr
    }

    currentCdr.status = status;
    await this.cdrRepository.update(currentCdr);

    switch (status) {
      case CdrStatus.ACCEPTED:
        await emitNatsEvent(subjects.cdrStatusAccepted, new CDRAcceptedEvent({ cdrId: currentCdr.cdrId }));
        // TODO: Create CDR document in sessions collection (new state of the CDR is BILLED)
        break;
      case CdrStatus.REJECTED:
        await emitNatsEvent(
          subjects.cdrStatusRejected,
          new CDRRejectedEvent({ cdrId: currentCdr.cdrId, reason: CDRRejectionReason.CDR_REJECTION_REASON_UNSPECIFIED })
        );
        break;
    }

    return this.mapToDomainModel(currentCdr);
  }

  async update(cdrId: string, updatedCdr: Partial<Cdr>): Promise<Cdr> {
    const currentCdr = await this.cdrRepository.load(cdrId);
    Object.assign(currentCdr, updatedCdr);
    await this.cdrRepository.update(currentCdr);
    return this.mapToDomainModel(currentCdr);
  }

  async delete(cdrId: string): Promise<void> {
    return await this.cdrRepository.softDelete(cdrId);
  }

  async search(search: CdrSearchArgs): Promise<[Cdr[], number]> {
    const query: any = {};
    if (search.ids?.length) {
      query._id = { $in: search.ids };
    }

    ['id', 'cdrId', 'externalCdrId', 'source', 'contractId', 'evseId', 'cost', 'status', 'endTime']
      .filter((field) => search[field])
      .forEach((field) => (query[field] = search[field])); // Add search criteria to query

    if (search.searchPhrase) {
      const searchFields = ['cdrId', 'externalCdrId', 'contractId', 'evseId', 'source', 'status', 'location.name'];
      query.$or = searchFields.map((field) => ({
        [field]: { $regex: escapeRegExp(search.searchPhrase), $options: 'i' },
      }));
    }

    const cdrs: MongooseCdr[] = await this.cdrRepository.paginatedFind(query, {
      skip: search.skip,
      limit: search.limit,
      sortKey: search.sort.field,
      sortOrder: search.sort.order,
    });
    const numDocuments = await this.cdrRepository.count(query);

    return [cdrs.map((cdr) => this.mapToDomainModel(cdr)), numDocuments];
  }

  protected mapToDomainModel(document: MongooseCdr): Cdr {
    return {
      id: document._id,
      tokenId: document.tokenId,
      accountId: document.accountId,
      location: document.location,
      cdrId: document.cdrId,
      externalCdrId: document.externalCdrId,
      providerId: document.providerId,
      source: document.source,
      contractId: document.contractId,
      startTime: document.startTime,
      endTime: document.endTime,
      evseId: document.evseId,
      powerType: document.powerType,
      connectorId: document.connectorId,
      cost: document.cost,
      chargingPeriods: document.chargingPeriods,
      status: document.status,
      totalKwh: document.totalKwh,
    };
  }
}
```

**Audit-Entry Mongoose Schema**\
This code snippet showcases the Mongoose Schema for the Audit-Entry Model. Audit-Entries are responsible for logging changes to whatever other model in the database and store them in a new collection so we have an Audit Trail of all changes in the system without too much overhead.

```javascript
const schema = new mongoose.Schema(
  {
    requestUrl: { type: String, required: true },
    requestMethod: { type: String, required: true },
    routePrefix: { type: String },
    routeNormalizedPath: { type: String },
    activity: { type: String, required: true },
    objectBefore: { type: 'Mixed' },
    objectAfter: { type: 'Mixed' },
    objectId: { type: String },
    objectType: { type: String },
    type: { type: String },
    deletedAt: { type: Date },
    user: {
      type: ObjectId,
      ref: 'User',
      required: [() => this.credential === null, 'User is required if Credential is not set'],
    },
    credential: {
      type: ObjectId,
      ref: 'Credential',
      required: [() => this.user === null, 'Credential is required if User is not set'],
    },
    account: { type: ObjectId, ref: 'Account' },
    provider: { type: ObjectId, ref: 'Provider' },
    deleted: { type: 'Boolean', default: false },
  },
  {
    timestamps: true,
  }
);

schema.statics.getContextFields = function (ctx) {
  return {
    ...(ctx.state.authUser?.id ? { user: ctx.state.authUser?.id } : {}),
    ...(ctx.state.authUser?.accountId ? { account: ctx.state.authUser?.accountId } : {}),
    ...(ctx.state.authCredential?.id ? { credential: ctx.state.authCredential?.id } : {}),
    provider: ctx.state.provider?.id || ctx.state.authUser?.providerId,
    requestMethod: ctx.request.method,
    requestUrl: ctx.request.url,
    routeNormalizedPath: ctx.routerPath,
    routePrefix: ctx.router.opts.prefix,
  };
};

schema.statics.getObjectFields = function getObjectFields(object, fields = []) {
  const isMongooseDoc = object instanceof mongoose.Model;
  if (!isMongooseDoc) throw Error('AuditEntry.getObjectFields only works with mongoose documents');

  const objectFields = {
    objectId: object.id,
    objectType: object.constructor.modelName,
  };

  if (fields.length) {
    const { original, pathsModified, isNew } = object.$locals;
    const filteredPaths = isNew
      ? fields
      : intersection(pathsModified, fields).filter((field) => {
          if (!object.get(field)?.equals) return true;
          return !object.get(field).equals(get(original, field));
        });

    if (isNew) {
      objectFields.objectAfter = pick(object.toObject({ depopulate: true }), filteredPaths);
    } else {
      const after = pick(object.toObject({ depopulate: true }), filteredPaths);
      if (!isEmpty(after)) {
        const before = pick(original, filteredPaths);
        objectFields.objectAfter = after;
        objectFields.objectBefore = before;
      }
    }
  }

  return objectFields;
};

schema.statics.append = function (activity, ctx, { object, fields, type = 'audit trail', ...options }) {
  const fromContext = this.getContextFields(ctx);

  if (object) {
    options.objectType = object.constructor.modelName;
    const objectFields = this.getObjectFields(object, fields || this.getSchemaFields(object.constructor));
    Object.assign(options, objectFields, options);
  }

  if (isEmpty(options.objectAfter) && options.objectAfter !== undefined) {
    return; // don't append to the log if nothing changed
  }

  const user = options?.user || fromContext?.user;
  const credential = options?.credential || fromContext?.credential;

  return this.create({
    ...fromContext,
    activity,
    objectId: object?.id || options.objectId,
    objectType: options.objectType,
    objectBefore: options.objectBefore,
    objectAfter: options.objectAfter,
    type,
    user,
    credential,
    account: options?.account || fromContext?.account,
    provider: options?.provider || fromContext?.provider,
  });
};

schema.statics.getSchemaFields = function (model, excludeFields = []) {
  const excludedFields = ['_id', '__v', 'createdAt', 'deleted', ...excludeFields];
  return Object.keys(model.schema.obj).filter((field) => !excludedFields.includes(field));
};
```

To create an Audit Entry for a change to a document (E.g. a BillingPlan) the following piece of code can be used:

```javascript
    await this.auditEntryRepository.append('updated billingPlan', ctx, { object: currentBillingPlan });
```

Note that the developer experience of adding a new Audit Trail Entry is very simple and all complex logic is obfuscated in the Audit Entry Model.\
\
**Remote Sessions Status Handler**\
This file is triggered through a CRON job every minute to handle active remote sessions. Remote sessions are sessions triggered by a Mobility Service Provider on a changer of another remote Charge Point Operator. This requires authentication and communication between the systems of both parties and updating status towards the user. The job checks for remote sessions that are not Cancelled, Completed or Errored and handles them by updating the status through attempting to find the corresponding active session that the Charge Point Operator should've sent, otherwise it tries to find the corresponding Charge Detail Record indicating the charge session is done and updates the Remote Session accordingly.

```typescript
const maximumAgeForInactiveMinutes = config.get('MINIMUM_PAYMENT_AGE_FOR_INACTIVE_MINUTES', 'number') || 10;
export const maximumAgeForInactive = maximumAgeForInactiveMinutes * 60 * 1000;

const maximumAgeForActiveMinutes = config.get('MINIMUM_PAYMENT_AGE_FOR_ACTIVE_MINUTES', 'number') || 4320;
export const maximumAgeForActive = maximumAgeForActiveMinutes * 60 * 1000;

const stopSessionBackoffMinutes = config.get('REMOTE_SESSION_STOP_BACKOFF_MINUTES', 'number') || 5;
const stopSessionBackoff = stopSessionBackoffMinutes * 60 * 1000;

@singleton()
export class MspRemoteSessionStatusManager {
  constructor(
    private readonly remoteSessionService: MspRemoteSessionService,
    private readonly remoteSessionRepository: MspRemoteSessionRepository,
    private readonly mspSessionRepository: MspSessionRepository,
    private readonly activeSessionRepository: ActiveSessionRepository,
    private readonly paymentRepository: PaymentRepository,
    private readonly tokenRepository: TokenRepository
  ) {}

  async handleRemoteSessions() {
    const remoteSessions = this.remoteSessionRepository.findStream({
      status: { $nin: [RemoteSessionStatus.COMPLETED, RemoteSessionStatus.CANCELLED, RemoteSessionStatus.ERROR] },
    });

    for await (const remoteSession of remoteSessions) {
      logger.info(`Handling remote session ${remoteSession.id} with status ${remoteSession.status}`);
      try {
        await this.handleOngoingRemoteSessionStatus(remoteSession);
        await this.handleInactiveRemoteSession(remoteSession);
        await this.handleOldActiveRemoteSession(remoteSession);
      } catch (error) {
        await this.remoteSessionService.setError(remoteSession, error);
      }
    }
  }

  async handleOngoingRemoteSessionStatus(remoteSession: MspRemoteSession) {
    switch (remoteSession.status) {
      case RemoteSessionStatus.STARTING:
        await this.attemptToFindAndAttachActiveSession(remoteSession);
        break;
      case RemoteSessionStatus.ERROR: // We have a case when remote session can be marked as ERROR, but we still can receive CDR for it. (critical for PSP payments)
      case RemoteSessionStatus.STOPPING:
        if (!(await this.attemptToCompleteAsExcludedCPOSession(remoteSession))) {
          await this.attemptToFindAndAttachCDR(remoteSession);
        }
        break;
      case RemoteSessionStatus.ACTIVE:
        await this.handleActiveRemoteSession(remoteSession);
        break;
    }
  }

  private async handleActiveRemoteSession(remoteSession: MspRemoteSession) {
    if (remoteSession.activeSessionId) {
      const activeSession = await this.activeSessionRepository.findById(remoteSession.activeSessionId);
      if (activeSession.status === ActiveSessionStatus.COMPLETED) {
        await this.attemptToFindAndAttachCDR(remoteSession);
      }
      if (remoteSession.paymentId && remoteSession.transactionId) {
        await this.handlePaymentPreAuthLimit(activeSession, remoteSession);
      }
    }
    if (remoteSession.mspSessionId) {
      const cdr = await this.mspSessionRepository.findById(remoteSession.mspSessionId);
      await this.handleCDRFound(cdr, remoteSession);
    }
  }

  private async attemptToFindAndAttachActiveSession(remoteSession: MspRemoteSession) {
    const activeSession = await this.findActiveSession(remoteSession);
    if (activeSession) {
      await this.handleActiveSessionFound(activeSession, remoteSession);
    }
  }

  private async attemptToFindAndAttachCDR(remoteSession: MspRemoteSession) {
    const cdr = await this.findCDR(remoteSession);
    if (cdr) {
      await this.handleCDRFound(cdr, remoteSession);
    }
  }

  private async handleCDRFound(cdr: MongooseSession, remoteSession: MspRemoteSession) {
    return this.remoteSessionService.completeSession(cdr, remoteSession);
  }

  private async handleActiveSessionFound(activeSession: ActiveSession, remoteSession: MspRemoteSession) {
    if (([RemoteSessionStatus.STARTING, RemoteSessionStatus.PENDING] as string[]).includes(remoteSession.status)) {
      await this.remoteSessionService.setSessionActive(remoteSession, activeSession);
      return;
    }

    if (([RemoteSessionStatus.ACTIVE, RemoteSessionStatus.STOPPING] as string[]).includes(remoteSession.status)) {
      if (remoteSession.createdAt < new Date(Date.now() - maximumAgeForActive)) {
        await this.remoteSessionService.setError(
          remoteSession,
          new Error('Remote session is older than 3 days, but no Active Session or CDR was found.')
        );
      }
      return;
    }
  }

  private async preauthLimitReached(activeSession: ActiveSession, remoteSession: MspRemoteSession): Promise<boolean> {
    if (!activeSession.currentTotal) return false; // no total to compare to - likely haven't received any meter values yet

    const payment = await this.paymentRepository.findById(remoteSession.paymentId);
    const vatPercentage = activeSession.vatInfo?.['vatPercentage'];

    let sessionTotal = activeSession.currentTotal;
    if (vatPercentage) {
      sessionTotal = sessionTotal * (vatPercentage / 100 + 1); // apply VAT if we can
    }

    return (
      payment.status === PaymentStatus.PREAUTH_ACCEPTED && // ensure the payment is in the correct state
      payment.preauthAmount > 0 && // ensure we have a valid preauth amount
      sessionTotal > payment.preauthAmount * 0.95 // within 5% of preauth limit
    );
  }

  private async findCDR(remoteSession: RemoteSession) {
    const { activeSessionId, infraProviderId, transactionId: externalId } = remoteSession;
    const activeSession = await this.activeSessionRepository.findById(activeSessionId);
    const tokenContractId = activeSession?.rawRecord?.auth_id;

    const cdr = await this.mspSessionRepository.findOne(
      {
        externalId,
        infraProviderId,
        remoteSessionId: { $exists: false },
        deleted: false,
        providerContext: 'msp',
        invoiceId: { $exists: false },
        ...(tokenContractId && { tokenContractId }),
      },
      undefined,
      { sort: { createdAt: -1 } }
    );
    return cdr || null;
  }

  private async findActiveSession(remoteSession: MspRemoteSession) {
    const token = await this.tokenRepository.findById(remoteSession.tokenId);
    const activeSession = await this.activeSessionRepository.findOne(
      {
        infraProviderId: remoteSession.partyId,
        deleted: false,
        status: ActiveSessionStatus.ACTIVE,
        remoteSessionId: { $exists: false },
        tokenId: remoteSession.tokenId,
        userId: token.userId,
      },
      { sort: { createdAt: -1 } }
    );
    return activeSession || null;
  }

  async handleInactiveRemoteSession(remoteSession: MspRemoteSession) {
    if (remoteSession.statusChangedAt < new Date(Date.now() - maximumAgeForInactive)) {
      switch (remoteSession.status) {
        case RemoteSessionStatus.PENDING:
        case RemoteSessionStatus.STARTING: {
          await this.remoteSessionService.cancelSession(
            remoteSession,
            MspRemoteSessionCancelledReason.NO_ACTIVE_SESSION_RECEIVED
          );
          break;
        }
        case RemoteSessionStatus.STOPPING: {
          const errorMessage = `Session status has been in ${remoteSession.status} more than ${maximumAgeForInactiveMinutes} minutes, aborting`;
          await this.remoteSessionService.setError(remoteSession, new Error(errorMessage));
        }
      }
    }
  }

  async handleOldActiveRemoteSession(remoteSession: MspRemoteSession) {
    if (remoteSession.createdAt < new Date(Date.now() - maximumAgeForActive)) {
      switch (remoteSession.status) {
        case RemoteSessionStatus.ACTIVE:
        case RemoteSessionStatus.STOPPING: {
          const errorMessage = `Remote session is older than ${
            maximumAgeForActiveMinutes / 60 / 24
          } days, but no Active Session or CDR was found.`;
          await this.remoteSessionService.setError(remoteSession, new Error(errorMessage));
        }
      }
    }
  }

  private async handlePaymentPreAuthLimit(activeSession: ActiveSession, remoteSession: MspRemoteSession) {
    const preauthReached = await this.preauthLimitReached(activeSession, remoteSession);
    const shouldAttemptStop =
      !remoteSession.stopRequestedAt || remoteSession.stopRequestedAt < new Date(Date.now() - stopSessionBackoff);

    if (preauthReached && shouldAttemptStop) {
      await this.remoteSessionService.stopSession({ remoteSessionId: remoteSession.id, skipUserCheck: true });
    }
  }

  private async attemptToCompleteAsExcludedCPOSession(remoteSession: MspRemoteSession): Promise<boolean> {
    try {
      return this.remoteSessionService.checkAndCompleteExcludedSession(remoteSession);
    } catch (e) {
      logger.error(`Error in completing excluded remote sessions`);
      return false;
    }
  }
}
```






</div>
</details>

- - -

### Check out the project!

[<button>![icon](/assets/e-flux-logo-150x150.jpeg) E-Flux Website</button>](https://e-flux.io/)
[<button>![icon](/assets/this_is_road_logo.jpg) Road.io Website</button>](https://road.io/)
[<button>![icon](/assets/github.png) E-Flux GitHub</button>](https://github.com/e-flux-platform)