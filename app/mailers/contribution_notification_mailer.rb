# frozen_string_literal: true

class ContributionNotificationMailer < ApplicationMailer
  def notify_admin(id)
    @contribution = Contribution.find id
    mail(to: 'contact@grasruts.com', subject: 'Grasruts: Campaign Contribution Notification')
  end

  def notify_donor(id)
    @contribution = Contribution.find id
    mail(to: @contribution.user.email, subject: "Grasruts: #{@contribution.campaign.name} Contribution Notification")
  end
end
