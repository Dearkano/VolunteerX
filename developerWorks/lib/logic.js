/*
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 

 * 
 */

/**
 * 发布志愿者项目 
 */
async function issueVolunteerWork(tx) {
    const assetRegistry = await getAssetRegistry('org.volunteerx.network.VolunteerWork')
    await assetRegistry.update(tx.project)
}

/**
 * 发布捐赠项目 
 */
async function issueCharityWork(tx) {
    const assetRegistry = await getAssetRegistry('org.volunteerx.network.CharityWork')

    return await assetRegistry.update(tx.project)
}

/**
 * 志愿者报名参与志愿者活动
 */
async function applyForVolunteerWork(tx) {
    const {
        volunteerId,
        projectId
    } = tx

    const volunteerWorkRegistry = await getAssetRegistry('org.volunteerx.network.VolunteerWork')

    const project = await volunteerWorkRegistry.get(projectId)

    project.volunteers.push(volunteerId)
    project.unConfirmedVolunteers.push(volunteerId)

    return await volunteerWorkRegistry.update(project)
}

/**
 * 确权参与
 */
async function authorizeToken(tx) {
    const {
        volunteerId,
        commonwealId,
        projectId
    } = tx

    const volunteerRegistry = await getParticipantRegistry('org.volunteerx.network.Volunteer')
    const volunteerWorkRegistry = await getAssetRegistry('org.volunteerx.network.VolunteerWork')

    const volunteer = await volunteerRegistry.get(volunteerId)
    const project = await volunteerWorkRegistry.get(projectId)

    if (commonwealId !== project.issuer.id) {
        return
    }

    // 志愿者获取token
    volunteer.voteTokenBalance += project.award

    // 志愿者已确权项目
    let pos = volunteer.unFinishedVolunteerWorks.indexOf(project.id)
    volunteer.unFinishedVolunteerWorks.splice(pos, 1)
    volunteer.finishedVolunteerWorks.push(project.id)

    // 项目添加该志愿者
    pos = project.unConfirmedVolunteers.indexOf(volunteer.id)
    project.unConfirmedVolunteers.splice(pos, 1)
    project.confirmedVolunteers.push(volunteer.id)

    // 更新账本
    return await Promise.all([
        volunteerRegistry.update(volunteer),
        volunteerWorkRegistry.update(project)
    ])
}

/**
 * 志愿者投票捐赠项目
 */
async function vote(tx) {
    const {
        volunteerId,
        projectId,
        balance
    } = tx

    const volunteerRegistry = await getParticipantRegistry('org.volunteerx.network.Volunteer')
    const charityWorkRegistry = await getAssetRegistry('org.volunteerx.network.CharityWork')

    // 更新志愿者账本
    const volunteer = await volunteerRegistry.get(volunteerId)
    volunteer.voteTokenBalance -= balance

    // 更新项目账本
    const project = await charityWorkRegistry.get(projectId)
    project.receivedToken += balance

    // 判断是否满足触发条件
    if (project.receivedToken >= project.targetBalance) {
        // TODO:资金池资金不足报错
        return Promise.all([
            volunteerRegistry.update(volunteer),
            charityWorkRegistry.update(project),
            tokenTransfer(projectId, balance)
        ])
    } else {
        return await Promise.all([
            volunteerRegistry.update(volunteer),
            charityWorkRegistry.update(project)
        ])
    }
}

async function tokenTransfer(projectId, balance) {
    const charityWorkRegistry = await getAssetRegistry('org.volunteerx.network.CharityWork')
    const tokenPoolRegistry = await getAssetRegistry('org.volunteerx.network.TokenPool')
    const beneficiaryRegistry = await getParticipantRegistry('org.volunteerx.network.Beneficiary')

    const project = await charityWorkRegistry.get(projectId)
    const tokenPool = await tokenPoolRegistry.get(project.type)
    const beneficiary = await beneficiaryRegistry.get(project.beneficiary)

    // 更新账本
    project.status = 1
    tokenPool.balance -= balance
    beneficiary.balance += balance

    return await Promise.all([
        charityWorkRegistry.update(project),
        tokenPoolRegistry.update(tokenPool),
        beneficiaryRegistry.update(beneficiary)
    ])
}

async function tokenIssue(tx) {
    const {
        bankId,
        balance
    } = tx

    const bankRegistry = await getParticipantRegistry('org.volunteerx.network.Bank')
    const bank = await bankRegistry.get(bankId)

    bank.issuedToken += balance

    return await bankRegistry.update(bank)
}

async function donate(tx) {
    const {
        donorId,
        balance,
        type
    } = tx

    const donorRegistry = await getParticipantRegistry('org.volunteerx.network.Donor')
    const tokenPoolRegistry = await getAssetRegistry('org.volunteerx.network.TokenPool')

    const donor = donorRegistry.get(donorId)
    const tokenPool = tokenPoolRegistry.get(type)

    if (donor.balance >= balance) {
        donor.balance -= balance
        tokenPool.balance += balance
    }

    return await Promise.all([
        donorRegistry.update(donor),
        tokenPoolRegistry.update(tokenPool)
    ])
}