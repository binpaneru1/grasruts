class ContributionController < ApplicationController
  
  def create
    param = contribution_param.merge(campaign_id: params[:campaign_id])
    @contribution = current_user.contributions.create(param)
    redirect_to edit_campaign_contribution_path(params[:campaign_id], @contribution.id)
  end

  def edit
    @contribution = Contribution.find_by_id params[:id]
    @user = current_user
  end

  def update
    @contribution = Contribution.find_by_id(params[:id]).update(contribution_param)
    @user = current_user
    @user.attributes = user_param
    @user.save(context: :contrib)
    unless @user.errors.messages.empty?
      flash[:error] = @user.errors.messages.values.flatten
      redirect_back(fallback_location: root_path)
    end
    redirect_to campaign_contribution_payment_option_path(params[:campaign_id], params[:id])
  end

  def payment_option
    @campaign = Campaign.find_by_id params[:campaign_id]
    @contribution = Contribution.find_by_id(params[:contribution_id])
  end

  def khalti_verification
    headers = {
      Authorization: "Key #{ENV['KHALTI_SECRET_KEY']}" 
    }
    uri = URI.parse('https://khalti.com/api/v2/payment/verify/')
    https = Net::HTTP.new(uri.host, uri.port)
    https.use_ssl = true
    request = Net::HTTP::Post.new(uri.request_uri, headers)
    request.set_form_data('token' => params[:token], 'amount' => params[:amount])
    response = https.request(request)
    
    contribution = Contribution.find_by_id params[:contribution_id]
    payment = contribution.payments.new
    payment.raw = JSON.parse(response.body)
    payment.amount = params[:amount]
    payment.ref_id = params[:token]
    payment.user_id = current_user.id
    payment.save!
  end

  def payment_success
    @campaign = Campaign.find_by_id params[:campaign_id]
  end


  private

  def contribution_param
    params.require(:contribution).permit(:amount, :anonymous, :user_id, :reward_id, :campaign_id)
  end

  def user_param
    params.require(:user).permit(:name, :email, :country, :city, :address, :contact_number, :pan)
  end

  def payment_param
    params
  end
end