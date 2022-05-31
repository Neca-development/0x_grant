pipeline {
  agent none

  environment {
    REGISTRY_HOST = credentials('docker-registry-host')
    REGISTRY_HOST_REMOTE = credentials('docker-registry-domain')
    JENKINS_SERVER = credentials('jenkins-server')
    SLACK_CHANNEL = 'C03HKNFUWDS'
    PRODUCTION_URL = 'https://nft2nft.win/'
    REMOTE_SSH_PROFILE = 'hackathon'
  }

  stages {
    stage ('Check build') {
      agent any

      when { changeRequest() }

      steps {
        build_pr('unistory-node', 16)
      }
    }

    stage('Build') {
      agent any

      when {
        allOf {
          not {
            changeRequest()
          }
          anyOf {
            branch 'master'
            branch 'main'
            branch 'development'
          }
        }
      }

      steps {
        build_image()
        script {
          if (env.BRANCH_NAME == "master" || env.BRANCH_NAME == "main") {
            notify_slack('Production build success')
          }
        }
      }
    }

    stage('Start') {
      parallel {
        stage('Prod') {
          agent any
          when {
            not {
              changeRequest()
            }
            anyOf {
              branch 'master'
              branch 'main'
            }
          }

          environment {
            GIT_REPO_NAME = env.GIT_URL.replaceFirst(/^.*\/([^\/]+?).git$/, '$1').toLowerCase()
          }

          steps {
            sh '''
              ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no $REMOTE_SSH_PROFILE bash -c "'
                mkdir -p frontend
              '"

              scp docker-compose.yml $REMOTE_SSH_PROFILE:frontend
              scp docker-compose.prod.yml $REMOTE_SSH_PROFILE:frontend
              scp .env $REMOTE_SSH_PROFILE:frontend

              ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no $REMOTE_SSH_PROFILE \
                REGISTRY_HOST_REMOTE=${REGISTRY_HOST_REMOTE} \
                GIT_REPO_NAME=${GIT_REPO_NAME} \
                BRANCH_NAME=${BRANCH_NAME} \
                bash -c "'
                  cd frontend
                  docker-compose -f docker-compose.yml -f docker-compose.prod.yml pull
                  docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
                  docker image prune
                '"
            '''
            notify_slack('Production deployment success')
          }
        }
      }
    }
  }

  post {
    failure {
      node(null) {
        script {
          if (env.BRANCH_NAME == "development" || env.BRANCH_NAME == "master" || env.BRANCH_NAME == "main") {
            notify_slack('Build failure')
          }
        }
      }
    }
  }
}
