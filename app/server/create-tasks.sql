CREATE TABLE IF NOT EXISTS task (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE,
  title VARCHAR(256) NOT NULL,
  assignee VARCHAR(256) NOT NULL,
  description VARCHAR(512),
  due_date datetime,
  CONSTRAINT task_pk PRIMARY KEY (id)
); 

CREATE TABLE IF NOT EXISTS prerequisites (
  parent_id BIGINT UNSIGNED NOT NULL,
  child_id BIGINT UNSIGNED NOT NULL,
  CONSTRAINT parent_id_fk FOREIGN KEY(parent_id)
    REFERENCES task(id),
  CONSTRAINT child_id_fk FOREIGN(child_id)
    REFERENCES task(id),
  CONSTRAINT prerequisites_pk PRIMARY KEY(parent_id, child_id);
);