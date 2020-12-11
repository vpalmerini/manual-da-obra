import React from "react";

import Page from "components/Page/Page";
import Container from "components/Container/Container";

import styles from "./NewConstruction.module.scss";

const NewConstruction = () => (
  <Page>
    <Container>
      <div className={styles.newConstruction}>
        <div className={styles.title}>
          <h1>Adicionar Obra</h1>
        </div>
      </div>
    </Container>
  </Page>
);

export default NewConstruction;
