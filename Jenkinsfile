pipeline {
	agent any

	stages {
		stage('SCM') {
			steps {
				checkout scm
				sh 'echo $GIT_BRANCH'
				sh 'echo $GIT_COMMIT'
			}
		}
		stage('Setup') {
			agent {
				docker { image 'node:12.16.3-alpine3.10' }
			}

			environment {
				HOME = '.'
			}
			steps {
				sh 'npm install'
			}
		}
		stage('Build') {
			agent {
				docker { image 'node:12.16.3-alpine3.10' }
			}

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
