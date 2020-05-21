pipeline {
	agent {
			docker { image '12.16.3-alpine3.9' }
	}

	stages {
		stage('SCM') {
			steps {
				checkout scm
				sh 'echo $GIT_BRANCH'
				sh 'echo $GIT_COMMIT'
			}
		}
		stage('Setup') {
			steps {
				sh 'npm install'
			}
		}
		stage('Build') {
			steps {
				sh 'npm run build'
			}
		}
		stage('Test') {
			steps {
				echo 'Testing..'
			}
		}
		stage('Deploy') {
			steps {
				echo 'Deploying....'
				sh 'docker build -t  phyrion/tfg:latest .'
				sh 'docker-compose up --force-recreate -d'
			}
		}
	}
}
