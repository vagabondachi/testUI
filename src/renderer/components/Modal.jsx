import React from 'react';
const Modal = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="overlay">
      <div className="modalContainer">
        <div className="content">
          <h1 id="title-termsofservice">Terms of Service</h1>
          <p id="subheadTOS">
            Age requirements and responsibility of parents and guardians
          </p>
          <p id="descriptionTOS">
            By accessing our services, you confirm that you’re at least 13 years
            old and meet the minimum age of digital consent in your country. We
            maintain a list of minimum ages around the world as a resource for
            you, but we aren’t able to guarantee that it is always accurate.If
            you are old enough to access our services in your country, but not
            old enough to have authority to consent to our terms, your parent or
            guardian must agree to our terms on your behalf. Please ask your
            parent or guardian to read these terms with you. If you’re a parent
            or legal guardian, and you allow your teenager to use the services,
            then these terms also apply to you and you’re responsible for your
            teenager’s activity on the services.a{' '}
          </p>
          <h1 id="title-termsofservice"> Privacy Policy</h1>
          <p id="descriptionTOS">
            This Privacy Policy explains how we collect, use, store, protect,
            and share your personal information through our services. It’s
            important that you read this entire policy, but here’s a summary to
            get you started:
            <ul id="privacypolicylist">
              <li>
                <b>We care a lot about privacy</b>. We are committed to creating
                spaces where people can come together and find belonging.
                Respecting user privacy is a key part of that mission.
              </li>
              <li>
                <b>We don’t sell your data</b>.
              </li>
              <li>
                <b>We limit what information is required</b>. We require the
                information that enables us to create your account, provide our
                services, meet our commitments to our users, and satisfy our
                legal requirements. The rest is optional.
              </li>
              <li>
                <b>We care deeply about safety</b>. Our dedicated Trust & Safety
                team works hard to help keep our community safe. We also use
                certain information to help us identify violations of our
                Community Guidelines and prevent harmful content from being
                distributed through the services.
              </li>
              <li>
                <b>We give you control</b>. We give you the ability to control
                your privacy on WeedleZ.
              </li>
            </ul>
          </p>
          <p id="subheadTOS">The information we collect</p>
          <p id="descriptionTOS">
            We collect certain information when you use WeedleZ. This includes
            information you provide to us, information we collect automatically,
            and information we receive from other sources.
          </p>
          <p id="subheadTOS">Information you provide to us</p>
          <p id="descriptionTOS">
            <ul id="privacypolicylist">
              <li>
                <b>Account information</b>. When you create a WeedleZ account,
                you can come up with a username and password, and provide a way
                of contacting you (such as an email address). You’ll also need
                to provide your birthday. To access the dashboard and other
                features, you may need to verify your account .
              </li>
              <li>
                <b>Content you create</b>. This includes any content that you
                upload to the service. For example, you may write messages
                (including drafts). This also includes your profile information
                and the information you provide when you create channels. We
                generally do not store the contents of channels. If we were to
                change that in the future (for example, to facilitate content
                moderation), we would disclose that to you in advance.
              </li>
              <li>
                <b>Information from actions you take</b>. We collect information
                about your use of and activities on the services. This includes
                the servers or other communities you join, content moderation
                decisions you make, and other related actions.
              </li>
              <li>
                <b>Other information you provide directly to us</b>. You may
                have the option to submit additional information as you use
                WeedleZ. For example, you may choose to participate in surveys
                where you can provide feedback on the application, or submit
                information to our WeedleZ Support teams.
              </li>
            </ul>
          </p>
          <p id="subheadTOS">How we use your information</p>
          <p id="descriptionTOS">
            We use your information for the following purposes:
            <ul>
              <li>
                <u>To fulfill our contract with you</u>
              </li>
              <br></br>
              <ul id="privacypolicylist">
                <li>
                  <b>To provide you with the services</b>. We use your
                  information to provide you with the WeedleZ services. For
                  example, we collect and store the messages you send and
                  display them as you direct. We also use the information you
                  provide to us to create and manage your account.
                </li>
                <li>
                  <b>To meet our commitments to the WeedleZ community</b>. We
                  work hard to try to make WeedleZ a safe, positive, and
                  inclusive place. To do so, we use your information to monitor
                  for and take action against users and content that violate our
                  Terms of Service, Community Guidelines, and other policies.
                  This includes responding to user reports. We also use certain
                  information, which may include content reported to us and
                  public posts, to develop and improve systems and models that
                  can be automated to more swiftly detect, categorize, and take
                  action against prohibited content or conduct.
                </li>
                <li>
                  <b>To contact you</b>. We use your information to contact you
                  in connection with your account, such as to verify or secure
                  it with email authentication. We may also use your information
                  to contact you about policy changes, or to let you know about
                  new features we think you’ll like. You may opt-out of
                  receiving marketing communications. Where local law requires,
                  we will obtain your consent before sending such
                  communications.
                </li>
                <li>
                  <b>To provide customer service</b>. We use your information to
                  respond to your questions about our services, and to
                  investigate bugs or other issues.
                </li>
              </ul>
              <br></br>

              <li>
                <u>To comply with our legal obligations</u> <br></br>
                <br></br>
                We retain and use your information in connection with potential
                legal claims when necessary and for compliance, regulatory, and
                auditing purposes. For example, we retain information where we
                are required by law or if we are compelled to do so by a court
                order or regulatory body. Also, when you exercise any of your
                applicable legal rights to access, amend, or delete your
                personal information, we may request identification and
                verification documents from you for the purpose of confirming
                your identity.
                <br></br>
              </li>

              <br></br>

              <li>
                ‍<u>With your consent</u>
                <br></br>
                ‍We may also collect and use personal information with your
                consent. You can revoke your consent at any time (mostly through
                our services directly), though note that you might not be able
                to use any service or feature that requires collection or use of
                that personal information.
                <br></br>
              </li>

              <br></br>

              <li>
                <u>‍To protect someone’s vital interests </u>
                <br></br>
                <br></br>
                We may collect or share personal data if we think someone’s life
                is in danger—for example, to help resolve an urgent medical
                situation.
              </li>
            </ul>
          </p>

          <p id="subheadTOS"> How we share your information</p>
          <p id="descriptionTOS">
            <ul id="privacypolicylist">
              <li>
                <b>When you tell us to</b>. When you add your content to the
                services, you are telling us to share that content with certain
                communities, people, or in the case of public spaces, with
                anyone who accesses it. Who can access that information is
                determined by who can access a particular community.{' '}
              </li>
              <li>
                <b>To comply with the law</b>. We may share information in
                response to a request for information if we believe disclosure
                is required by law, including meeting national security or law
                enforcement requirements. Where allowed and feasible, we will
                attempt to provide you with prior notice before disclosing your
                information in response to such a request. Our Transparency
                Report has additional information about how we respond to
                requests from governments and law enforcement entities.
              </li>
              <li>
                <b>In an emergency</b>. We may share information if we believe
                in good faith that it's necessary to prevent serious harm to a
                person.
              </li>
              <li>
                <b>To enforce our policies and rights</b>. We may share
                information if needed to enforce our Terms of Service, Community
                Guidelines, or other policies, or to protect the rights,
                property, and safety of ourselves and others.
              </li>
            </ul>
          </p>

          <div className="btnContainer">
            <button id="btnContainer" onClick={onClose} className="btnPrimary">
              I read and understand.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
