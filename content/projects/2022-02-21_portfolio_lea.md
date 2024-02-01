---
title: Portfolio Lea Shamaa
startDate: 2022-02-21
endDate: 2022-6-21
thumbnail: /assets/portfolio_lea.png
type: Personal
description: This project is a portfolio website for Lea Shamaa aimed at aiding
  her Journalistic career. The website features blog articles, portfolio items
  and past experiences. The website also has a contact form and about page. The
  project was made using Next.js & DecapCMS. The front-end features animations,
  effects, static rendering and dark-mode. On the back-end CMS the content of
  the website can be altered and added to.
---
As I was looking for new personal projects to pursue and my girlfriend was entering the journalistic world and needed an online presence where she could show-off her past experiences and projects. Much like the personal portfolio website you are reading this on right now but then in the context of journalism instead of software engineering.

The website needed be easy to manage in terms of adding new content, articles and basic customization. I continued to build on my go-to tech stack which includes Next.js as full-stack framework and DecapCMS (Formerly NetlfyCMS) as content management system hosted on Netlify. All styling was done using TailwindCSS and TailwindCSS Prose for the article styling. Content is saved from the CMS directly into the repository through automatic Pull-Requests after which new builds are triggered through Continuous Integration with Netlify as well as preview deployments for Drafted changes in the CMS.

- - -

## Technologies & Frameworks

<ul class="icon-list">
<li>Next.js <a href="https://nextjs.org/"><img src="/assets/nextjs.png" alt="icon"></a></li>
<li>TailwindCSS <a href="https://tailwindcss.com/"><img src="/assets/tailwindcss.png" alt="icon"></a></li>
<li>DecapCMS (Formerly Netlify CMS) <a href="https://decapcms.org/"><img src="/assets/decapcms.png" alt="icon"></a></li>
<li>Node.js <a href="https://nodejs.org/en"><img src="/assets/nodejs.png" alt="icon"></a></li>
<li>Sass <a href="https://sass-lang.com/"><img src="/assets/sass.png" alt="icon"></a></li>
<li>GitHub <a href="https://github.com/"><img src="/assets/github.png" alt="icon"></a></li>
<li>Netlify <a href="https://www.netlify.com/"><img src="/assets/netlify.png" alt="icon"></a></li>
<li>Progressive Web App <a href="#"><img src="/assets/pwa.png" alt="icon"></a></li>
<li>Markdown <a href="https://www.markdownguide.org/"><img src="/assets/markdown.png" alt="icon"></a></li>
</ul>

- - -

## Screens

<div class="images-grid">
<img src="/assets/portfolio_lea_1.png" />
<img src="/assets/portfolio_lea_2.png" />
<img src="/assets/portfolio_lea_3.png" />
</div>

- - -

## Summary

The goal of this personal portfolio website is for Lea to be able to have an online presence where she can link to her past publications online, create articles for professional experiences she had and also have a more free-form blog section where she can freely create diverse articles and assign them to different categories. Finally the website should be a welcome point for potential clients that want to work with Lea.

The website has already generated traffic and some potential leads for Lea's journalistic ventures which is amazing to see!

- - -

## Screens

<div class="images-grid">
<img src="/assets/dashboard.e-flux.io_.png" />
<img src="/assets/dashboard.e-flux.io_-1-.png" />
<img src="/assets/schermafbeelding-2024-01-25-163305.png" />
<img src="/assets/dsc00700.jpg" />
</div>

- - -

<details >
<summary>Code Snippets</summary>
<div>

The following are some code snippets of components and back-end code for the portfolio website that are powerful, demonstrate good coding practices and that I'm proud of. The snippets demonstrate clean, concise and powerful code. *(Code has been compacted in some cases).*

**Home index**\
This code snippet is the homepage of the website showing the 3 most recent items from the 3 types of posts on the site. It statically retrieves the experiences, posts, articles and additional config for the homepage such as labels & links at build time of the application. This way static HTML is served at all times improving time to first paint and SEO!

```jsx
export const getStaticProps = async () => {

  const experiences = (await getExperiences({ preview: true })).slice(0, 3)

  const posts = (await getPosts({ preview: true })).slice(0, 3)

  const articles = (await getAllArticles(config.usernameMedium)).slice(0, 3)

  const homeContent = await getPage("home")

  return {
    props: {
      homeContent,
      experiences,
      posts,
      articles
    },
    revalidate: 60,
  }
}

const Home = ({ homeContent, experiences, posts, articles }) => {
  useNetlifyIdentityRedirectHook()

  return (
    <>
      <TypeWriter quotes={homeContent.quotes}/>

      <div className={`${utils.page} flex flex-col gap-12`}>
        <HomePreviewCollection
          title={homeContent.portfolioTitle}
          label={homeContent.portfolioLabel}
          link="/portfolio"
          content={articles.map((article) => <ArticleHomePreview key={article.title} article={article}/>)}
        />
        <hr className="-mb-4 -mt-10 mobile:hidden"/>
        <HomePreviewCollection
          title={homeContent.blogTitle}
          label={homeContent.blogLabel}
          link="/blog"
          content={posts.map((post) => <PostHomePreview key={post.id} post={post}/>)}
        />
        <hr className="-mb-4 -mt-10 mobile:hidden"/>
        <HomePreviewCollection
          title={homeContent.experiencesTitle}
          label={homeContent.experiencesLabel}
          link="/experiences"
          content={experiences.map((experience) => <ExperienceHomePreview key={experience.id} experience={experience}/>)}
        />
      </div>
    </>
  )
}

Home.withLayout = (page) => <Layout>{page}</Layout>
```

**Audit-Entry Mongoose Schema**\
This code snippet showcases the Mongoose Schema for the Audit-Entry Model. Audit-Entries are responsible for logging changes to whatever other model in the database and store them in a new collection so we have an Audit Trail of all changes in the system without too much overhead.

```javascript

```

To create an Audit Entry for a change to a document (E.g. a BillingPlan) the following piece of code can be used:

```javascript

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